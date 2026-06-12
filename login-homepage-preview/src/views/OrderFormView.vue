<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const isEdit = computed(() => route.name === 'order-edit')
const pageTitle = computed(() => isEdit.value ? t('orders.editTitle') : t('orders.createTitle'))
const orderId = computed(() => route.params.id as string | undefined)

const formRef = ref<FormInstance>()
const submitting = ref(false)

interface OrderItem {
  name: string
}

const form = reactive({
  customer: '',
  phone: '',
  items: [{ name: '' }] as OrderItem[],
  amount: 0,
  channel: 'APP' as 'APP' | '网页' | '小程序',
  address: '',
  deliveryMethod: '快递' as '快递' | '自提' | '同城配送',
  remark: '',
})

const rules: FormRules = {
  customer: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效手机号', trigger: 'blur' },
  ],
  amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
}

function addItem() {
  form.items.push({ name: '' })
}

function removeItem(index: number) {
  if (form.items.length > 1) {
    form.items.splice(index, 1)
  }
}

function getMockOrders(): any[] {
  return (window as any).__mockOrders || []
}

function saveMockOrders(orders: any[]) {
  (window as any).__mockOrders = orders
}

onMounted(() => {
  if (isEdit.value && orderId.value) {
    const orders = getMockOrders()
    const order = orders.find((o: any) => o.id === orderId.value)
    if (order) {
      form.customer = order.customer
      form.phone = order.phone
      form.items = order.items.map((name: string) => ({ name }))
      form.amount = order.total
      form.channel = order.channel
      form.address = order.address || ''
      form.deliveryMethod = order.deliveryMethod || '快递'
      form.remark = order.remark || ''
    }
  }
})

async function handleSubmit() {
  if (!formRef.value) return
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  const orders = getMockOrders()
  const itemNames = form.items.map(i => i.name).filter(n => n.trim())

  if (isEdit.value && orderId.value) {
    const idx = orders.findIndex((o: any) => o.id === orderId.value)
    if (idx !== -1) {
      orders[idx] = {
        ...orders[idx],
        customer: form.customer,
        phone: form.phone,
        items: itemNames,
        total: form.amount,
        channel: form.channel,
        address: form.address,
        deliveryMethod: form.deliveryMethod,
        remark: form.remark,
      }
    }
    ElMessage.success(t('orders.updateSuccess'))
  } else {
    const newOrder = {
      id: `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(orders.length + 1).padStart(3, '0')}`,
      customer: form.customer,
      phone: form.phone,
      items: itemNames,
      total: form.amount,
      status: 'pending',
      channel: form.channel,
      address: form.address,
      deliveryMethod: form.deliveryMethod,
      remark: form.remark,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    }
    orders.unshift(newOrder)
    ElMessage.success(t('orders.createSuccess'))
  }

  saveMockOrders(orders)
  submitting.value = false
  router.push('/admin/orders')
}
</script>

<template>
  <div>
    <!-- Toolbar: breadcrumb + actions -->
    <div class="flex items-center justify-between mb-4 md:mb-6">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/orders' }">{{ t('orders.title') }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="isEdit" :to="{ path: `/admin/orders/${orderId}` }">{{ orderId }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ pageTitle }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="flex items-center gap-3">
        <el-button type="primary" :loading="submitting" :disabled="submitting" @click="handleSubmit">
          {{ isEdit ? t('common.save') : t('common.submit') }}
        </el-button>
        <el-button plain @click="router.back()">{{ t('common.cancel') }}</el-button>
      </div>
    </div>

    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      class="flex flex-col gap-4"
      @submit.prevent="handleSubmit"
    >
      <!-- Section: 基本信息 -->
      <div class="bg-white rounded-r-btn rounded-l-none border border-neutral-200 border-l-[3px] border-l-blue-600 p-5 md:p-6">
        <div class="text-sm font-semibold text-blue-700 mb-4 uppercase tracking-wide">{{ $t('基本信息') }}</div>

        <!-- Grid row: customer, phone, amount -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <el-form-item :label="t('orders.fields.customer')" prop="customer">
            <el-input v-model="form.customer" placeholder="张三" />
          </el-form-item>
          <el-form-item :label="t('orders.fields.phone')" prop="phone">
            <el-input v-model="form.phone" placeholder="138****1234" />
          </el-form-item>
          <el-form-item :label="t('orders.fields.amount')" prop="amount">
            <el-input-number v-model="form.amount" :min="0" :precision="2" class="w-full" />
          </el-form-item>
        </div>

        <!-- Grid row: channel -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <el-form-item :label="t('orders.fields.channel')">
            <el-select v-model="form.channel" class="w-full">
              <el-option label="APP" value="APP" />
              <el-option :label="t('orders.channel.web')" value="网页" />
              <el-option :label="t('orders.channel.miniprogram')" value="小程序" />
            </el-select>
          </el-form-item>
        </div>

        <!-- Full-width at section end: dynamic item list -->
        <el-form-item :label="t('orders.fields.items')" class="mt-4 mb-0">
          <div class="flex flex-col gap-2 w-full">
            <div v-for="(item, i) in form.items" :key="i" class="flex items-center gap-2">
              <el-input v-model="item.name" :placeholder="t('orders.fields.itemName')" class="flex-1" />
              <el-button v-if="form.items.length > 1" link type="danger" :icon="Delete" @click="removeItem(i)" />
            </div>
            <el-button link type="primary" :icon="Plus" @click="addItem">
              {{ t('orders.fields.itemsAdd') }}
            </el-button>
          </div>
        </el-form-item>
      </div>

      <!-- Section: 其他信息 -->
      <div class="bg-white rounded-r-btn rounded-l-none border border-neutral-200 border-l-[3px] border-l-cyan-600 p-5 md:p-6">
        <div class="text-sm font-semibold text-cyan-700 mb-4 uppercase tracking-wide">{{ $t('其他信息') }}</div>

        <!-- Grid row: deliveryMethod -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <el-form-item :label="t('orders.fields.deliveryMethod')">
            <el-select v-model="form.deliveryMethod" class="w-full">
              <el-option :label="t('orders.fields.deliveryExpress')" value="快递" />
              <el-option :label="t('orders.fields.deliveryPickup')" value="自提" />
              <el-option :label="t('orders.fields.deliveryLocal')" value="同城配送" />
            </el-select>
          </el-form-item>
        </div>

        <!-- Full-width at section end: address textarea, remark textarea -->
        <el-form-item :label="t('orders.fields.address')" class="mt-4">
          <el-input v-model="form.address" type="textarea" :rows="2" :placeholder="t('orders.fields.addressPlaceholder')" />
        </el-form-item>
        <el-form-item :label="t('orders.fields.remark')" class="mb-0">
          <el-input v-model="form.remark" type="textarea" :rows="2" :placeholder="t('orders.fields.remarkPlaceholder')" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
