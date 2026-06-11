<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { DataAnalysis, ShoppingCart, Money, Warning, ArrowUp, ArrowDown } from '@element-plus/icons-vue'

const { t, tm } = useI18n()

const metrics = [
  { labelKey: 'dashboard.metrics.activeUsers', value: '12,483', change: '+12%', trend: 'up', icon: DataAnalysis },
  { labelKey: 'dashboard.metrics.ordersToday', value: '347', change: '+5%', trend: 'up', icon: ShoppingCart },
  { labelKey: 'dashboard.metrics.revenue', value: '¥38,200', change: '-3%', trend: 'down', icon: Money },
  { labelKey: 'dashboard.metrics.pending', value: '23', change: '0%', trend: 'flat', icon: Warning },
]

const chartDays = computed(() => tm('dashboard.days') as string[])
const chartValues = [80, 110, 95, 140, 120, 90, 60]
const maxValue = Math.max(...chartValues)

const categories = computed(() => [
  { name: t('dashboard.categories.design'), value: 142, color: '#2563eb' },
  { name: t('dashboard.categories.development'), value: 98, color: '#0891b2' },
  { name: t('dashboard.categories.marketing'), value: 76, color: '#d97706' },
  { name: t('dashboard.categories.operations'), value: 51, color: '#16a34a' },
])
const maxCat = Math.max(...categories.value.map((c) => c.value))

const timeline = computed(() => {
  const items = tm('dashboard.timeline') as Array<{ title: string; desc: string; time: string }>
  return items.map((item, i) => ({ ...item, active: i === 0 }))
})
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-neutral-950">{{ t('dashboard.title') }}</h1>
      <p class="text-sm text-neutral-500 mt-1">{{ t('dashboard.description') }}</p>
    </div>

    <!-- Metric Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div
        v-for="m in metrics"
        :key="m.labelKey"
        class="bg-white rounded-btn border border-neutral-200 p-4 hover:shadow-md hover:border-brand-200 cursor-pointer transition-all duration-150"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm text-neutral-500">{{ t(m.labelKey) }}</span>
          <el-icon :size="18" color="#737373">
            <component :is="m.icon" />
          </el-icon>
        </div>
        <div class="text-2xl font-bold text-neutral-950 mb-1">{{ m.value }}</div>
        <div class="flex items-center gap-1 text-sm" :class="{
          'text-green-600': m.trend === 'up',
          'text-red-600': m.trend === 'down',
          'text-neutral-500': m.trend === 'flat',
        }">
          <el-icon v-if="m.trend === 'up'" :size="14"><ArrowUp /></el-icon>
          <el-icon v-else-if="m.trend === 'down'" :size="14"><ArrowDown /></el-icon>
          <span>{{ m.change }}</span>
          <span class="text-neutral-400 text-xs ml-1">{{ t('dashboard.vsLastMonth') }}</span>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <!-- Bar Chart -->
      <div class="md:col-span-2 bg-white rounded-btn border border-neutral-200 p-5">
        <h3 class="text-base font-semibold text-neutral-950 mb-5">{{ t('dashboard.chartOrderTrend') }}</h3>
        <div class="flex items-end gap-3 h-[200px] px-2">
          <div
            v-for="(val, i) in chartValues"
            :key="i"
            class="flex-1 flex flex-col items-center gap-1"
          >
            <span class="text-xs text-neutral-500">{{ val }}</span>
            <div
              class="w-full rounded-t-sm transition-all duration-150 cursor-pointer hover:brightness-90"
              :title="`${chartDays[i]}: ${val} 单`"
              :style="{
                height: `${(val / maxValue) * 160}px`,
                background: `linear-gradient(180deg, #2563eb 0%, #eff6ff 100%)`,
              }"
            ></div>
            <span class="text-xs text-neutral-400 mt-2">{{ chartDays[i] }}</span>
          </div>
        </div>
      </div>

      <!-- Category Chart -->
      <div class="bg-white rounded-btn border border-neutral-200 p-5">
        <h3 class="text-base font-semibold text-neutral-950 mb-5">{{ t('dashboard.chartCategory') }}</h3>
        <div class="flex flex-col gap-4 justify-center h-[200px]">
          <div
            v-for="cat in categories"
            :key="cat.name"
            class="flex items-center gap-3"
          >
            <span class="text-sm text-neutral-500 w-10">{{ cat.name }}</span>
            <div class="flex-1 bg-neutral-100 rounded-full h-4 overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-150 cursor-pointer hover:brightness-90"
                :title="`${cat.name}: ${cat.value}`"
                :style="{ width: `${(cat.value / maxCat) * 100}%`, background: cat.color }"
              ></div>
            </div>
            <span class="text-sm text-neutral-800 w-9 text-right">{{ cat.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity Timeline -->
    <div class="bg-white rounded-btn border border-neutral-200 p-5">
      <h3 class="text-base font-semibold text-neutral-950 mb-5">{{ t('dashboard.activity') }}</h3>
      <div class="flex flex-col">
        <div
          v-for="(item, i) in timeline"
          :key="i"
          class="flex gap-3 pb-5 relative hover:bg-neutral-50 -mx-2 px-2 rounded-btn transition-colors duration-150"
          :class="{ 'border-l-2': i < timeline.length - 1 }"
          :style="{ borderLeftColor: item.active ? '#2563eb' : '#e5e5e5', paddingLeft: '16px' }"
        >
          <div
            class="absolute w-2 h-2 rounded-full"
            :style="{ left: '-5px', top: '4px', background: item.active ? '#2563eb' : '#d4d4d4' }"
          ></div>
          <div>
            <div class="text-sm text-neutral-950">{{ item.title }}</div>
            <div class="text-sm text-neutral-500 mt-1">{{ item.desc }}</div>
            <div class="text-xs text-neutral-300 mt-2">{{ item.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
