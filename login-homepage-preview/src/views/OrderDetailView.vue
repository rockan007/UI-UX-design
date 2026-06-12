<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Edit, Delete, ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const orderId = computed(() => route.params.id as string)

interface OrderDetail {
  id: string
  customer: string
  phone: string
  items: string[]
  total: number
  status: string
  channel: string
  address?: string
  deliveryMethod?: string
  remark?: string
  createdAt: string
}

const order = ref<OrderDetail | null>(null)
const statusMap: Record<string, { labelKey: string; type: string }> = {
  pending:    { labelKey: 'orders.status.pending', type: 'warning' },
  paid:       { labelKey: 'orders.status.paid', type: '' },
  shipped:    { labelKey: 'orders.status.shipped', type: 'info' },
  completed:  { labelKey: 'orders.status.completed', type: 'success' },
  refunded:   { labelKey: 'orders.status.refunded', type: 'danger' },
  cancelled:  { labelKey: 'orders.status.cancelled', type: 'info' },
}

function getMockOrders(): any[] {
  return (window as any).__mockOrders || []
}

onMounted(() => {
  const orders = getMockOrders()
  order.value = orders.find((o: any) => o.id === orderId.value) || null
})

function handleEdit() {
  router.push(`/admin/orders/${orderId.value}/edit`)
}

function handleDelete() {
  ElMessageBox.confirm(
    t('orders.deleteConfirm', { id: orderId.value }),
    t('orders.deleteTitle'),
    { confirmButtonText: t('orders.deleteConfirmBtn'), cancelButtonText: t('common.cancel'), type: 'warning' },
  )
    .then(() => {
      const orders = getMockOrders()
      const idx = orders.findIndex((o: any) => o.id === orderId.value)
      if (idx !== -1) orders.splice(idx, 1)
      ;(window as any).__mockOrders = orders
      ElMessage.success(t('orders.deletedMessage', { id: orderId.value }))
      router.push('/admin/orders')
    })
    .catch(() => {})
}
</script>

<template>
  <div>
    <!-- Breadcrumb -->
    <el-breadcrumb separator="/" class="mb-4 md:mb-6">
      <el-breadcrumb-item :to="{ path: '/admin/orders' }">{{ t('orders.title') }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ orderId }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div v-if="!order" class="bg-white rounded-btn border border-neutral-200 p-12 text-center text-sm text-neutral-500">
      订单不存在
    </div>

    <template v-else>
      <!-- Header -->
      <div class="flex items-center justify-between mb-4 md:mb-6">
        <div class="flex items-center gap-3">
          <el-button link :icon="ArrowLeft" @click="router.back()" />
          <div>
            <div class="text-xl font-semibold text-neutral-950">{{ order.id }}</div>
            <div class="text-sm text-neutral-500 mt-1">{{ t('orders.detailTitle') }}</div>
          </div>
        </div>
        <el-tag :type="statusMap[order.status]?.type" size="large" effect="light">
          {{ t(statusMap[order.status]?.labelKey) }}
        </el-tag>
      </div>

      <!-- Detail Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <!-- Basic Info -->
        <div class="bg-white rounded-btn border border-neutral-200 p-5">
          <div class="text-sm font-semibold text-neutral-500 mb-4">基本信息</div>
          <div class="flex flex-col gap-3">
            <div class="flex justify-between">
              <span class="text-sm text-neutral-500">{{ t('orders.fields.customer') }}</span>
              <span class="text-sm text-neutral-950">{{ order.customer }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-neutral-500">{{ t('orders.fields.phone') }}</span>
              <span class="text-sm text-neutral-950">{{ order.phone }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-neutral-500">{{ t('orders.fields.channel') }}</span>
              <span class="text-sm text-neutral-950">{{ order.channel }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-neutral-500">{{ t('orders.columns.createdAt') }}</span>
              <span class="text-sm text-neutral-950">{{ order.createdAt }}</span>
            </div>
          </div>
        </div>

        <!-- Order Info -->
        <div class="bg-white rounded-btn border border-neutral-200 p-5">
          <div class="text-sm font-semibold text-neutral-500 mb-4">订单信息</div>
          <div class="flex flex-col gap-3">
            <div class="flex justify-between">
              <span class="text-sm text-neutral-500">{{ t('orders.fields.amount') }}</span>
              <span class="text-sm font-semibold text-neutral-950">{{ $n(order.total, 'currency') }}</span>
            </div>
            <div>
              <span class="text-sm text-neutral-500 block mb-2">{{ t('orders.fields.items') }}</span>
              <div class="flex flex-wrap gap-1">
                <el-tag v-for="(item, i) in order.items" :key="i" size="small" effect="plain" type="info">
                  {{ item }}
                </el-tag>
              </div>
            </div>
            <div v-if="order.deliveryMethod" class="flex justify-between">
              <span class="text-sm text-neutral-500">{{ t('orders.fields.deliveryMethod') }}</span>
              <span class="text-sm text-neutral-950">{{ order.deliveryMethod }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Secondary Info -->
      <div v-if="order.address || order.remark" class="bg-white rounded-btn border border-neutral-200 p-5 mb-6">
        <div class="text-sm font-semibold text-neutral-500 mb-4">其他信息</div>
        <div class="flex flex-col gap-3">
          <div v-if="order.address">
            <span class="text-sm text-neutral-500 block mb-1">{{ t('orders.fields.address') }}</span>
            <span class="text-sm text-neutral-950">{{ order.address }}</span>
          </div>
          <div v-if="order.remark">
            <span class="text-sm text-neutral-500 block mb-1">{{ t('orders.fields.remark') }}</span>
            <span class="text-sm text-neutral-950">{{ order.remark }}</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 pb-4">
        <el-button type="primary" :icon="Edit" @click="handleEdit">
          {{ t('common.edit') }}
        </el-button>
        <el-button type="danger" :icon="Delete" @click="handleDelete">
          {{ t('common.delete') }}
        </el-button>
      </div>
    </template>
  </div>
</template>
