<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Plus, Delete, WarningFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const isEdit = computed(() => route.name === 'order-edit')
const isView = computed(() => route.name === 'order-detail')
const pageTitle = computed(() => {
  if (isEdit.value) return t('orders.editTitle')
  if (isView.value) return ''
  return t('orders.createTitle')
})
const orderId = computed(() => route.params.id as string | undefined)

interface TabDefinition {
  key: string
  label: string
  count?: number
  hasError?: boolean
}

const tabs = computed<TabDefinition[]>(() => [
  { key: 'basic', label: '基本信息' },
  { key: 'delivery', label: '配送 & 备注' },
  { key: 'items', label: '商品清单', count: form.items.length },
  { key: 'attachments', label: '附件', count: form.attachments.length },
])

const activeTab = ref<string>('basic')

function handleTabChange(key: string) {
  const tab = tabs.value.find(t => t.key === key)
  if (tab) tab.hasError = false
}

const formRef = ref<FormInstance>()
const submitting = ref(false)

interface OrderItem {
  name: string
  spec: string
  quantity: number
  unitPrice: number
}

// Attachment interface for M2M demo
interface Attachment {
  fileName: string
  fileSize: string
  uploadedAt: string
}

const defaultAttachment = (): Attachment => ({
  fileName: '',
  fileSize: '',
  uploadedAt: new Date().toISOString().slice(0, 10),
})

const form = reactive({
  customer: '',
  phone: '',
  items: [{ name: '', spec: '', quantity: 1, unitPrice: 0 }] as OrderItem[],
  amount: 0,
  channel: 'APP' as 'APP' | '网页' | '小程序',
  address: '',
  deliveryMethod: '快递' as '快递' | '自提' | '同城配送',
  remark: '',
  attachments: [defaultAttachment()] as Attachment[],
})

const rules: FormRules = {
  customer: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效手机号', trigger: 'blur' },
  ],
  amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
}

function itemSubtotal(item: OrderItem): number {
  return (item.quantity || 0) * (item.unitPrice || 0)
}

const viewStatus = ref<{ labelKey: string; type: string }>({ labelKey: '', type: '' })
const statusMap: Record<string, { labelKey: string; type: string }> = {
  pending:    { labelKey: 'orders.status.pending', type: 'warning' },
  paid:       { labelKey: 'orders.status.paid', type: '' },
  shipped:    { labelKey: 'orders.status.shipped', type: 'info' },
  completed:  { labelKey: 'orders.status.completed', type: 'success' },
  refunded:   { labelKey: 'orders.status.refunded', type: 'danger' },
  cancelled:  { labelKey: 'orders.status.cancelled', type: 'info' },
}

function addItem() {
  form.items.push({ name: '', spec: '', quantity: 1, unitPrice: 0 })
}

function removeItem(index: number) {
  if (form.items.length > 1) {
    form.items.splice(index, 1)
  }
}

function addAttachment() {
  form.attachments.push(defaultAttachment())
}

function removeAttachment(i: number) {
  if (form.attachments.length > 1) {
    form.attachments.splice(i, 1)
  }
}

function getMockOrders(): any[] {
  return (window as any).__mockOrders || []
}

function saveMockOrders(orders: any[]) {
  (window as any).__mockOrders = orders
}

onMounted(() => {
  if ((isEdit.value || isView.value) && orderId.value) {
    const orders = getMockOrders()
    const order = orders.find((o: any) => o.id === orderId.value)
    if (order) {
      form.customer = order.customer
      form.phone = order.phone
      form.items = order.items.map((item: any) => ({
        name: typeof item === 'string' ? item : item.name,
        spec: item.spec || '',
        quantity: item.quantity || 1,
        unitPrice: item.unitPrice || 0,
      }))
      form.amount = order.total
      form.channel = order.channel
      form.address = order.address || ''
      form.deliveryMethod = order.deliveryMethod || '快递'
      form.remark = order.remark || ''
      form.attachments = (order as any).attachments?.length
        ? [...(order as any).attachments]
        : [defaultAttachment()]
      if (isView.value) {
        viewStatus.value = statusMap[order.status] || { labelKey: '', type: '' }
      }
    }
  }
})

async function handleSubmit() {
  if (!formRef.value) return
  submitting.value = true
  try {
    await formRef.value.validate()
  } catch {
    // Find first tab with errors and switch to it
    for (const tab of tabs.value) {
      if (tabHasErrors(tab.key)) {
        activeTab.value = tab.key
        tab.hasError = true
        break
      }
    }
    submitting.value = false
    return
  }
  try {
    const items = form.items
      .filter(item => item.name.trim())
      .map(item => ({
        name: item.name.trim(),
        spec: item.spec.trim(),
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }))
    const total = items.reduce((sum, item) =>
      sum + itemSubtotal(item), 0
    )
    if (isEdit.value) {
      const i = getMockOrders().findIndex(o => o.id === orderId.value)
      if (i !== -1) {
        Object.assign(getMockOrders()[i], {
          customer: form.customer,
          phone: form.phone,
          amount: total,
          channel: form.channel,
          items,
          address: form.address,
          deliveryMethod: form.deliveryMethod,
          remark: form.remark,
        })
      }
      ElMessage.success('保存成功')
    } else {
      getMockOrders().push({
        id: `ORD-${Date.now()}`,
        customer: form.customer,
        phone: form.phone,
        amount: total,
        channel: form.channel,
        items,
        status: 'pending' as const,
        createdAt: new Date().toISOString().slice(0, 10),
        address: form.address,
        deliveryMethod: form.deliveryMethod,
        remark: form.remark,
      })
      ElMessage.success('创建成功')
    }
    router.push('/admin/orders')
  } finally {
    submitting.value = false
  }
}

// Helper: check if a tab contains any field with validation errors
function tabHasErrors(tabKey: string): boolean {
  const tabFieldMap: Record<string, string[]> = {
    basic: ['customer', 'phone', 'amount', 'channel'],
    delivery: ['deliveryMethod', 'address', 'remark'],
    items: ['items'],
    attachments: ['attachments'],
  }
  const formFields = formRef.value?.fields ? Object.keys(formRef.value.fields) : []
  const tabFields = tabFieldMap[tabKey] || []
  return tabFields.some(f => formFields.includes(f))
}

function handleDelete() {
  if (!orderId.value) return
  ElMessageBox.confirm(
    t('orders.deleteConfirm', { id: orderId.value }),
    t('orders.deleteTitle'),
    { confirmButtonText: t('orders.deleteConfirmBtn'), cancelButtonText: t('common.cancel'), type: 'warning' },
  )
    .then(() => {
      const orders = getMockOrders()
      const idx = orders.findIndex((o: any) => o.id === orderId.value)
      if (idx !== -1) orders.splice(idx, 1)
      saveMockOrders(orders)
      ElMessage.success(t('orders.deletedMessage', { id: orderId.value }))
      router.push('/admin/orders')
    })
    .catch(() => {})
}
</script>

<template>
  <div>
    <!-- Toolbar: breadcrumb + actions -->
    <div class="flex items-center justify-between mb-4 md:mb-6">
      <div class="flex items-center gap-3">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/admin/orders' }">{{ t('orders.title') }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="isEdit" :to="{ path: `/admin/orders/${orderId}` }">{{ orderId }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="!isView">{{ pageTitle }}</el-breadcrumb-item>
          <el-breadcrumb-item v-else>{{ orderId }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tag v-if="isView && viewStatus.type" :type="viewStatus.type" effect="light">
          {{ t(viewStatus.labelKey) }}
        </el-tag>
      </div>
      <div class="flex items-center gap-3">
        <!-- View mode: Edit + Delete -->
        <template v-if="isView">
          <el-button type="primary" @click="router.push(`/admin/orders/${orderId}/edit`)">
            {{ t('common.edit') }}
          </el-button>
          <el-button type="danger" plain @click="handleDelete">
            {{ t('common.delete') }}
          </el-button>
        </template>
        <!-- Create/Edit mode: Save + Cancel -->
        <template v-else>
          <el-button type="primary" :loading="submitting" :disabled="submitting" @click="handleSubmit">
            {{ isEdit ? t('common.save') : t('common.submit') }}
          </el-button>
          <el-button plain @click="router.back()">{{ t('common.cancel') }}</el-button>
        </template>
      </div>
    </div>

    <!-- Tab bar (desktop only, hidden on mobile) -->
    <div v-if="tabs.length >= 2" class="hidden md:flex items-center gap-2 mb-4 border-b border-neutral-200 pb-0">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors"
        :class="activeTab === tab.key
          ? 'text-blue-600 border-b-2 border-blue-600 -mb-px'
          : 'text-neutral-500 hover:text-neutral-700'"
        @click="handleTabChange(tab.key)"
      >
        <span>{{ tab.label }}</span>
        <span v-if="tab.count !== undefined" class="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold"
          :class="activeTab === tab.key ? 'bg-blue-100 text-blue-700' : 'bg-neutral-100 text-neutral-500'">
          {{ tab.count }}
        </span>
        <el-icon v-if="tab.hasError" class="text-amber-500 ml-0.5"><WarningFilled /></el-icon>
      </button>
    </div>

    <el-form
      ref="formRef"
      :model="form"
      :rules="isView ? {} : rules"
      label-position="top"
      class="flex flex-col gap-4"
      @submit.prevent="isView ? undefined : handleSubmit()"
    >
      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- DESKTOP TAB PANE: basic (blue) -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div v-show="activeTab === 'basic'" class="hidden md:flex flex-col gap-4">
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-blue-600 p-5 md:p-6">
          <div class="text-sm font-semibold text-blue-700 mb-4 uppercase tracking-wide">{{ $t('基本信息') }}</div>

          <!-- Grid row: customer, phone, amount -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <el-form-item :label="t('orders.fields.customer')" prop="customer">
              <template v-if="isView">
                <div class="text-sm text-neutral-950 pt-1">{{ form.customer }}</div>
              </template>
              <el-input v-else v-model="form.customer" placeholder="张三" />
            </el-form-item>
            <el-form-item :label="t('orders.fields.phone')" prop="phone">
              <template v-if="isView">
                <div class="text-sm text-neutral-950 pt-1">{{ form.phone }}</div>
              </template>
              <el-input v-else v-model="form.phone" placeholder="138****1234" />
            </el-form-item>
            <el-form-item :label="t('orders.fields.amount')" prop="amount">
              <template v-if="isView">
                <div class="text-sm font-semibold text-neutral-950 pt-1">{{ $n(form.amount, 'currency') }}</div>
              </template>
              <el-input-number v-else v-model="form.amount" :min="0" :precision="2" class="w-full" />
            </el-form-item>
          </div>

          <!-- Grid row: channel -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <el-form-item :label="t('orders.fields.channel')">
              <template v-if="isView">
                <div class="text-sm text-neutral-950 pt-1">{{ form.channel }}</div>
              </template>
              <el-select v-else v-model="form.channel" class="w-full">
                <el-option label="APP" value="APP" />
                <el-option :label="t('orders.channel.web')" value="网页" />
                <el-option :label="t('orders.channel.miniprogram')" value="小程序" />
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- DESKTOP TAB PANE: delivery (cyan) -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div v-show="activeTab === 'delivery'" class="hidden md:flex flex-col gap-4">
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-cyan-600 p-5 md:p-6">
          <div class="text-sm font-semibold text-cyan-700 mb-4 uppercase tracking-wide">{{ $t('配送 & 备注') }}</div>

          <!-- Grid row: deliveryMethod -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <el-form-item :label="t('orders.fields.deliveryMethod')">
              <template v-if="isView">
                <div class="text-sm text-neutral-950 pt-1">{{ form.deliveryMethod }}</div>
              </template>
              <el-select v-else v-model="form.deliveryMethod" class="w-full">
                <el-option :label="t('orders.fields.deliveryExpress')" value="快递" />
                <el-option :label="t('orders.fields.deliveryPickup')" value="自提" />
                <el-option :label="t('orders.fields.deliveryLocal')" value="同城配送" />
              </el-select>
            </el-form-item>
          </div>

          <!-- Full-width at section end: address textarea, remark textarea -->
          <el-form-item :label="t('orders.fields.address')" class="mt-4">
            <template v-if="isView">
              <div class="text-sm text-neutral-950 pt-1 whitespace-pre-wrap">{{ form.address || '-' }}</div>
            </template>
            <el-input v-else v-model="form.address" type="textarea" :rows="2" :placeholder="t('orders.fields.addressPlaceholder')" />
          </el-form-item>
          <el-form-item :label="t('orders.fields.remark')" class="mb-0">
            <template v-if="isView">
              <div class="text-sm text-neutral-950 pt-1 whitespace-pre-wrap">{{ form.remark || '-' }}</div>
            </template>
            <el-input v-else v-model="form.remark" type="textarea" :rows="2" :placeholder="t('orders.fields.remarkPlaceholder')" />
          </el-form-item>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- DESKTOP TAB PANE: items (purple, O2M) -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div v-show="activeTab === 'items'" class="hidden md:flex flex-col gap-4">
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-purple-600 p-5 md:p-6">
          <div class="text-sm font-semibold text-purple-700 mb-4 uppercase tracking-wide">{{ $t('商品清单') }}</div>

          <!-- Edit mode: O2M items -->
          <div v-if="!isView">
            <div class="text-sm text-neutral-600 mb-2">{{ t('orders.fields.items') }}</div>
            <!-- Column headers -->
            <div class="hidden md:grid gap-2 px-1 py-2 border-b border-neutral-100 mb-2"
                 style="grid-template-columns: 2fr 1fr 80px 1fr 100px 40px">
              <span class="text-xs text-neutral-400">商品名称 *</span>
              <span class="text-xs text-neutral-400">规格/型号</span>
              <span class="text-xs text-neutral-400 text-center">数量</span>
              <span class="text-xs text-neutral-400 text-right">单价</span>
              <span class="text-xs text-neutral-400 text-right">小计</span>
              <span></span>
            </div>
            <!-- Data rows -->
            <div v-for="(item, i) in form.items" :key="i"
                 class="grid gap-2 items-center mb-2"
                 style="grid-template-columns: 2fr 1fr 80px 1fr 100px 40px">
              <el-input v-model="item.name" placeholder="商品名称" size="default" />
              <el-input v-model="item.spec" placeholder="规格" size="default" />
              <el-input-number v-model="item.quantity" :min="1" size="default" controls-position="right" class="w-full" />
              <el-input-number v-model="item.unitPrice" :min="0" :precision="2" size="default" controls-position="right" class="w-full" />
              <div class="text-sm font-semibold text-neutral-950 text-right">
                {{ $n(itemSubtotal(item), 'currency') }}
              </div>
              <el-button v-if="form.items.length > 1" link type="danger" :icon="Delete" @click="removeItem(i)"
                         class="justify-self-center" />
            </div>
            <el-button link type="primary" :icon="Plus" class="mt-2" @click="addItem">
              {{ t('orders.fields.itemsAdd') }}
            </el-button>
          </div>

          <!-- View mode: O2M items -->
          <div v-if="isView">
            <div class="text-sm text-neutral-600 mb-2">{{ t('orders.fields.items') }}</div>
            <!-- Column headers -->
            <div class="hidden md:grid gap-2 px-1 py-2 border-b border-neutral-100 mb-2"
                 style="grid-template-columns: 2fr 1fr 80px 1fr 100px">
              <span class="text-xs text-neutral-400">商品名称</span>
              <span class="text-xs text-neutral-400">规格/型号</span>
              <span class="text-xs text-neutral-400 text-center">数量</span>
              <span class="text-xs text-neutral-400 text-right">单价</span>
              <span class="text-xs text-neutral-400 text-right">小计</span>
            </div>
            <!-- Data rows -->
            <div v-for="(item, i) in form.items" :key="i"
                 class="grid gap-2 items-center py-2 border-b border-neutral-50 last:border-0"
                 style="grid-template-columns: 2fr 1fr 80px 1fr 100px">
              <div class="text-sm text-neutral-950">{{ item.name }}</div>
              <div class="text-sm text-neutral-500">{{ item.spec || '-' }}</div>
              <div class="text-sm text-neutral-950 text-center">{{ item.quantity }}</div>
              <div class="text-sm text-neutral-950 text-right">{{ $n(item.unitPrice, 'currency') }}</div>
              <div class="text-sm font-semibold text-neutral-950 text-right">{{ $n(itemSubtotal(item), 'currency') }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- DESKTOP TAB PANE: attachments (purple, M2M) -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div v-show="activeTab === 'attachments'" class="hidden md:flex flex-col gap-4">
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-purple-600 p-5 md:p-6">
          <div class="text-sm font-semibold text-purple-700 mb-4 uppercase tracking-wide">{{ $t('附件') }}</div>

          <!-- Edit mode: attachments grid -->
          <div v-if="!isView">
            <div class="text-sm text-neutral-600 mb-2">附件列表</div>
            <!-- Column headers -->
            <div class="hidden md:grid gap-2 px-1 py-2 border-b border-neutral-100 mb-2"
                 style="grid-template-columns: 2fr 1fr 1fr 40px">
              <span class="text-xs text-neutral-400">文件名 *</span>
              <span class="text-xs text-neutral-400">文件大小</span>
              <span class="text-xs text-neutral-400">上传日期</span>
              <span></span>
            </div>
            <!-- Data rows -->
            <div v-for="(att, i) in form.attachments" :key="i"
                 class="grid gap-2 items-center mb-2"
                 style="grid-template-columns: 2fr 1fr 1fr 40px">
              <el-input v-model="att.fileName" placeholder="文件名" size="default" />
              <el-input v-model="att.fileSize" placeholder="大小" size="default" />
              <el-input v-model="att.uploadedAt" type="date" size="default" />
              <el-button v-if="form.attachments.length > 1" link type="danger" :icon="Delete" @click="removeAttachment(i)"
                         class="justify-self-center" />
            </div>
            <el-button link type="primary" :icon="Plus" class="mt-2" @click="addAttachment">
              添加附件
            </el-button>
          </div>

          <!-- View mode: attachments list -->
          <div v-if="isView">
            <div class="text-sm text-neutral-600 mb-2">附件列表</div>
            <!-- Column headers -->
            <div class="hidden md:grid gap-2 px-1 py-2 border-b border-neutral-100 mb-2"
                 style="grid-template-columns: 2fr 1fr 1fr">
              <span class="text-xs text-neutral-400">文件名</span>
              <span class="text-xs text-neutral-400">文件大小</span>
              <span class="text-xs text-neutral-400">上传日期</span>
            </div>
            <!-- Data rows -->
            <div v-for="(att, i) in form.attachments" :key="i"
                 class="grid gap-2 items-center py-2 border-b border-neutral-50 last:border-0"
                 style="grid-template-columns: 2fr 1fr 1fr">
              <div class="text-sm text-neutral-950">{{ att.fileName || '-' }}</div>
              <div class="text-sm text-neutral-500">{{ att.fileSize || '-' }}</div>
              <div class="text-sm text-neutral-500">{{ att.uploadedAt || '-' }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- MOBILE: flat section cards (md:hidden) -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div class="md:hidden flex flex-col gap-4">
        <!-- Mobile section: 基本信息 (blue) -->
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-blue-600 p-5 md:p-6">
          <div class="text-sm font-semibold text-blue-700 mb-4 uppercase tracking-wide">{{ $t('基本信息') }}</div>

          <div class="grid grid-cols-1 gap-4">
            <el-form-item :label="t('orders.fields.customer')" prop="customer">
              <template v-if="isView">
                <div class="text-sm text-neutral-950 pt-1">{{ form.customer }}</div>
              </template>
              <el-input v-else v-model="form.customer" placeholder="张三" />
            </el-form-item>
            <el-form-item :label="t('orders.fields.phone')" prop="phone">
              <template v-if="isView">
                <div class="text-sm text-neutral-950 pt-1">{{ form.phone }}</div>
              </template>
              <el-input v-else v-model="form.phone" placeholder="138****1234" />
            </el-form-item>
            <el-form-item :label="t('orders.fields.amount')" prop="amount">
              <template v-if="isView">
                <div class="text-sm font-semibold text-neutral-950 pt-1">{{ $n(form.amount, 'currency') }}</div>
              </template>
              <el-input-number v-else v-model="form.amount" :min="0" :precision="2" class="w-full" />
            </el-form-item>
            <el-form-item :label="t('orders.fields.channel')">
              <template v-if="isView">
                <div class="text-sm text-neutral-950 pt-1">{{ form.channel }}</div>
              </template>
              <el-select v-else v-model="form.channel" class="w-full">
                <el-option label="APP" value="APP" />
                <el-option :label="t('orders.channel.web')" value="网页" />
                <el-option :label="t('orders.channel.miniprogram')" value="小程序" />
              </el-select>
            </el-form-item>
          </div>
        </div>

        <!-- Mobile section: 商品清单 (purple, O2M) -->
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-purple-600 p-5 md:p-6">
          <div class="text-sm font-semibold text-purple-700 mb-4 uppercase tracking-wide">{{ $t('商品清单') }}</div>

          <!-- Edit mode: O2M items -->
          <div v-if="!isView">
            <div class="text-sm text-neutral-600 mb-2">{{ t('orders.fields.items') }}</div>
            <div v-for="(item, i) in form.items" :key="i"
                 class="flex flex-col gap-2 mb-3 pb-3 border-b border-neutral-100 last:border-0 last:mb-0 last:pb-0">
              <div class="flex gap-2">
                <el-input v-model="item.name" placeholder="商品名称" size="default" class="flex-1" />
                <el-input v-model="item.spec" placeholder="规格" size="default" class="flex-1" />
              </div>
              <div class="flex gap-2 items-center">
                <el-input-number v-model="item.quantity" :min="1" size="default" controls-position="right" class="w-20" />
                <span class="text-xs text-neutral-400">x</span>
                <el-input-number v-model="item.unitPrice" :min="0" :precision="2" size="default" controls-position="right" class="flex-1" />
                <span class="text-sm font-semibold text-neutral-950 min-w-[60px] text-right">{{ $n(itemSubtotal(item), 'currency') }}</span>
                <el-button v-if="form.items.length > 1" link type="danger" :icon="Delete" @click="removeItem(i)" size="small" />
              </div>
            </div>
            <el-button link type="primary" :icon="Plus" class="mt-2" @click="addItem">
              {{ t('orders.fields.itemsAdd') }}
            </el-button>
          </div>

          <!-- View mode: O2M items -->
          <div v-if="isView">
            <div v-for="(item, i) in form.items" :key="i"
                 class="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0">
              <div>
                <div class="text-sm text-neutral-950 font-medium">{{ item.name }}</div>
                <div class="text-xs text-neutral-500">{{ item.spec || '-' }}</div>
              </div>
              <div class="text-right">
                <div class="text-sm text-neutral-950">{{ item.quantity }} x {{ $n(item.unitPrice, 'currency') }}</div>
                <div class="text-sm font-semibold text-neutral-950">{{ $n(itemSubtotal(item), 'currency') }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile section: 附件 (purple, M2M) -->
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-purple-600 p-5 md:p-6">
          <div class="text-sm font-semibold text-purple-700 mb-4 uppercase tracking-wide">{{ $t('附件') }}</div>

          <!-- Edit mode: attachments -->
          <div v-if="!isView">
            <div class="text-sm text-neutral-600 mb-2">附件列表</div>
            <div v-for="(att, i) in form.attachments" :key="i"
                 class="flex flex-col gap-2 mb-3 pb-3 border-b border-neutral-100 last:border-0 last:mb-0 last:pb-0">
              <el-input v-model="att.fileName" placeholder="文件名" size="default" />
              <div class="flex gap-2">
                <el-input v-model="att.fileSize" placeholder="文件大小" size="default" class="flex-1" />
                <el-input v-model="att.uploadedAt" type="date" size="default" class="flex-1" />
              </div>
              <div class="flex justify-end">
                <el-button v-if="form.attachments.length > 1" link type="danger" :icon="Delete" @click="removeAttachment(i)" size="small">
                  删除
                </el-button>
              </div>
            </div>
            <el-button link type="primary" :icon="Plus" class="mt-2" @click="addAttachment">
              添加附件
            </el-button>
          </div>

          <!-- View mode: attachments list -->
          <div v-if="isView">
            <div v-for="(att, i) in form.attachments" :key="i"
                 class="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0">
              <div class="flex-1 min-w-0">
                <div class="text-sm text-neutral-950 font-medium truncate">{{ att.fileName || '-' }}</div>
                <div class="text-xs text-neutral-500">{{ att.fileSize || '-' }} / {{ att.uploadedAt || '-' }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile section: 配送 & 备注 (cyan) -->
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-cyan-600 p-5 md:p-6">
          <div class="text-sm font-semibold text-cyan-700 mb-4 uppercase tracking-wide">{{ $t('配送 & 备注') }}</div>

          <div class="flex flex-col gap-4">
            <el-form-item :label="t('orders.fields.deliveryMethod')">
              <template v-if="isView">
                <div class="text-sm text-neutral-950 pt-1">{{ form.deliveryMethod }}</div>
              </template>
              <el-select v-else v-model="form.deliveryMethod" class="w-full">
                <el-option :label="t('orders.fields.deliveryExpress')" value="快递" />
                <el-option :label="t('orders.fields.deliveryPickup')" value="自提" />
                <el-option :label="t('orders.fields.deliveryLocal')" value="同城配送" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('orders.fields.address')">
              <template v-if="isView">
                <div class="text-sm text-neutral-950 pt-1 whitespace-pre-wrap">{{ form.address || '-' }}</div>
              </template>
              <el-input v-else v-model="form.address" type="textarea" :rows="2" :placeholder="t('orders.fields.addressPlaceholder')" />
            </el-form-item>
            <el-form-item :label="t('orders.fields.remark')" class="mb-0">
              <template v-if="isView">
                <div class="text-sm text-neutral-950 pt-1 whitespace-pre-wrap">{{ form.remark || '-' }}</div>
              </template>
              <el-input v-else v-model="form.remark" type="textarea" :rows="2" :placeholder="t('orders.fields.remarkPlaceholder')" />
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
