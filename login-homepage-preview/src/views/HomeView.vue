<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Monitor, ChatDotRound, DataAnalysis } from '@element-plus/icons-vue'

const router = useRouter()
const { t } = useI18n()

const features = [
  { icon: Monitor, titleKey: 'home.features.project.title', descKey: 'home.features.project.description' },
  { icon: ChatDotRound, titleKey: 'home.features.team.title', descKey: 'home.features.team.description' },
  { icon: DataAnalysis, titleKey: 'home.features.data.title', descKey: 'home.features.data.description' },
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
          <span class="font-semibold text-base text-neutral-950">{{ t('home.productName') }}</span>
        </div>
        <nav class="hidden md:flex items-center gap-8">
          <a href="#" class="text-sm text-neutral-800 no-underline hover:text-brand-600 transition-colors">{{ t('home.nav.home') }}</a>
          <a href="#" class="text-sm text-neutral-800 no-underline hover:text-brand-600 transition-colors">{{ t('home.nav.features') }}</a>
          <a href="#" class="text-sm text-neutral-800 no-underline hover:text-brand-600 transition-colors">{{ t('home.nav.about') }}</a>
        </nav>
        <el-button size="default" @click="goToLogin">{{ t('login.submit') }}</el-button>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-neutral-50 to-white">
      <div class="max-w-3xl mx-auto px-page py-20 md:py-28 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-neutral-950 leading-tight">
          {{ t('home.hero.title') }}
        </h1>
        <p class="mt-4 text-base text-neutral-500 max-w-lg mx-auto leading-relaxed">
          {{ t('home.hero.description') }}
        </p>
        <div class="flex gap-3 justify-center mt-8">
          <el-button type="primary" size="large">{{ t('home.hero.cta') }}</el-button>
          <el-button size="large" plain>{{ t('home.hero.secondary') }}</el-button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="max-w-5xl mx-auto px-page py-section">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="feat in features"
          :key="feat.titleKey"
          class="text-center p-8 rounded-card hover:bg-neutral-50 transition-colors duration-150"
        >
          <div class="w-12 h-12 bg-brand-50 rounded-card mx-auto mb-4 flex items-center justify-center">
            <el-icon :size="24" color="#2563eb">
              <component :is="feat.icon" />
            </el-icon>
          </div>
          <h3 class="text-lg font-semibold text-neutral-950 mb-2">{{ t(feat.titleKey) }}</h3>
          <p class="text-sm text-neutral-500 leading-relaxed">{{ t(feat.descKey) }}</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-neutral-50">
      <div class="max-w-2xl mx-auto px-page py-section text-center">
        <h2 class="text-2xl font-semibold text-neutral-950">{{ t('home.cta.title') }}</h2>
        <p class="mt-2 text-sm text-neutral-500">{{ t('home.cta.subtitle') }}</p>
        <div class="mt-6">
          <el-button type="primary" size="large">{{ t('home.hero.cta') }}</el-button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-neutral-200 py-6 text-center">
      <p class="text-xs text-neutral-500">{{ t('home.copyright') }}</p>
    </footer>
  </div>
</template>
