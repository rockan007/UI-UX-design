<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { DataAnalysis, ShoppingCart, Money, Warning, TrendCharts, ArrowUp, ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()

const activeMenu = ref('dashboard')

const metrics = [
  { label: '活跃用户', value: '12,483', change: '+12%', trend: 'up', icon: DataAnalysis },
  { label: '今日订单', value: '347', change: '+5%', trend: 'up', icon: ShoppingCart },
  { label: '收入', value: '¥38,200', change: '-3%', trend: 'down', icon: Money },
  { label: '待处理', value: '23', change: '0%', trend: 'flat', icon: Warning },
]

const chartDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const chartValues = [80, 110, 95, 140, 120, 90, 60]
const maxValue = Math.max(...chartValues)

const categories = [
  { name: '设计', value: 142, color: '#2563eb' },
  { name: '开发', value: 98, color: '#0891b2' },
  { name: '营销', value: 76, color: '#d97706' },
  { name: '运维', value: 51, color: '#16a34a' },
]
const maxCat = Math.max(...categories.map((c) => c.value))

const timeline = [
  { title: '新订单 #ORD-20240606-042', desc: '用户 张三 下单 ¥2,380', time: '2 分钟前', active: true },
  { title: '用户注册', desc: '新用户 李四 通过邀请链接注册', time: '15 分钟前', active: false },
  { title: '订单完成', desc: '#ORD-20240606-040 已确认收货', time: '1 小时前', active: false },
]
</script>

<template>
  <div class="flex min-h-screen bg-neutral-100">
    <!-- Sidebar -->
    <aside class="w-[220px] bg-white border-r border-neutral-200 flex-shrink-0 hidden md:block">
      <div class="px-5 py-5">
        <div class="flex items-center gap-2 mb-8">
          <div class="w-7 h-7 bg-brand-600 rounded-btn flex items-center justify-center">
            <el-icon :size="16" color="white"><TrendCharts /></el-icon>
          </div>
          <span class="font-semibold text-sm text-neutral-950">管理后台</span>
        </div>

        <nav class="flex flex-col gap-1">
          <div
            class="px-3 py-2 rounded-btn text-sm font-medium bg-brand-50 text-brand-600 cursor-pointer"
          >
            仪表盘
          </div>
          <div class="px-3 py-2 rounded-btn text-sm text-neutral-500 cursor-pointer hover:bg-neutral-50 transition-colors duration-150">
            用户管理
          </div>
          <div class="px-3 py-2 rounded-btn text-sm text-neutral-500 cursor-pointer hover:bg-neutral-50 transition-colors duration-150">
            订单管理
          </div>
          <div class="px-3 py-2 rounded-btn text-sm text-neutral-500 cursor-pointer hover:bg-neutral-50 transition-colors duration-150">
            系统设置
          </div>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 overflow-y-auto">
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-semibold text-neutral-950">仪表盘</h1>
        <p class="text-sm text-neutral-500 mt-1">过去 30 天的核心数据概览</p>
      </div>

      <!-- Metric Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div
          v-for="m in metrics"
          :key="m.label"
          class="bg-white rounded-btn border border-neutral-200 p-4"
        >
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm text-neutral-500">{{ m.label }}</span>
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
            <span class="text-neutral-400 text-xs ml-1">vs 上月</span>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <!-- Line Chart -->
        <div class="md:col-span-2 bg-white rounded-btn border border-neutral-200 p-5">
          <h3 class="text-base font-semibold text-neutral-950 mb-5">订单趋势（近 7 天）</h3>
          <div class="flex items-end gap-3 h-[200px] px-2">
            <div
              v-for="(val, i) in chartValues"
              :key="i"
              class="flex-1 flex flex-col items-center gap-1"
            >
              <span class="text-xs text-neutral-500">{{ val }}</span>
              <div
                class="w-full rounded-t-sm transition-all duration-300"
                :style="{
                  height: `${(val / maxValue) * 160}px`,
                  background: `linear-gradient(180deg, #2563eb 0%, #eff6ff 100%)`,
                }"
              ></div>
              <span class="text-xs text-neutral-400 mt-2">{{ chartDays[i] }}</span>
            </div>
          </div>
        </div>

        <!-- Bar Chart -->
        <div class="bg-white rounded-btn border border-neutral-200 p-5">
          <h3 class="text-base font-semibold text-neutral-950 mb-5">按类别分布</h3>
          <div class="flex flex-col gap-4 justify-center h-[200px]">
            <div
              v-for="cat in categories"
              :key="cat.name"
              class="flex items-center gap-3"
            >
              <span class="text-sm text-neutral-500 w-10">{{ cat.name }}</span>
              <div class="flex-1 bg-neutral-100 rounded-full h-4 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500"
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
        <h3 class="text-base font-semibold text-neutral-950 mb-5">最近活动</h3>
        <div class="flex flex-col">
          <div
            v-for="(item, i) in timeline"
            :key="i"
            class="flex gap-3 pb-5 relative"
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
    </main>
  </div>
</template>
