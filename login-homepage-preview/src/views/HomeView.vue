<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Monitor, ChatDotRound, DataAnalysis } from '@element-plus/icons-vue'

const router = useRouter()

const features = [
  { icon: Monitor, title: '项目管理', description: '看板、甘特图、任务分配，掌控项目全流程' },
  { icon: ChatDotRound, title: '团队协作', description: '即时通讯、文件共享、评论，团队无缝沟通' },
  { icon: DataAnalysis, title: '数据分析', description: '自定义报表、实时仪表盘，数据驱动决策' },
]

const goToLogin = () => router.push('/login')
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <header class="sticky top-0 bg-white/80 backdrop-blur border-b border-neutral-200 z-50">
      <div class="max-w-6xl mx-auto px-page flex items-center justify-between h-16">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-brand-600 rounded-btn"></div>
          <span class="font-semibold text-base text-neutral-950">产品名称</span>
        </div>
        <nav class="hidden md:flex items-center gap-8">
          <a href="#" class="text-sm text-neutral-800 no-underline hover:text-brand-600 transition-colors">首页</a>
          <a href="#" class="text-sm text-neutral-800 no-underline hover:text-brand-600 transition-colors">功能</a>
          <a href="#" class="text-sm text-neutral-800 no-underline hover:text-brand-600 transition-colors">关于</a>
        </nav>
        <el-button size="default" @click="goToLogin">登录</el-button>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-neutral-50 to-white">
      <div class="max-w-3xl mx-auto px-page py-20 md:py-28 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-neutral-950 leading-tight">
          让工作更高效
        </h1>
        <p class="mt-4 text-base text-neutral-500 max-w-lg mx-auto leading-relaxed">
          一体化解决方案，帮助团队协作、管理和交付。即刻开始，无需复杂配置。
        </p>
        <div class="flex gap-3 justify-center mt-8">
          <el-button type="primary" size="large">免费试用</el-button>
          <el-button size="large" plain>了解更多</el-button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="max-w-5xl mx-auto px-page py-section">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="feat in features"
          :key="feat.title"
          class="text-center p-8 rounded-card hover:bg-neutral-50 transition-colors duration-150"
        >
          <div class="w-12 h-12 bg-brand-50 rounded-card mx-auto mb-4 flex items-center justify-center">
            <el-icon :size="24" color="#2563eb">
              <component :is="feat.icon" />
            </el-icon>
          </div>
          <h3 class="text-lg font-semibold text-neutral-950 mb-2">{{ feat.title }}</h3>
          <p class="text-sm text-neutral-500 leading-relaxed">{{ feat.description }}</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-neutral-50">
      <div class="max-w-2xl mx-auto px-page py-section text-center">
        <h2 class="text-2xl font-semibold text-neutral-950">现在开始</h2>
        <p class="mt-2 text-sm text-neutral-500">已有 10,000+ 团队在使用</p>
        <div class="mt-6">
          <el-button type="primary" size="large">免费试用</el-button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-neutral-200 py-6 text-center">
      <p class="text-xs text-neutral-500">&copy; 2026 产品名称 &middot; 保留所有权利</p>
    </footer>
  </div>
</template>
