<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

const { locale, switchTo, supportedLocales } = useLocale()

const labels: Record<string, string> = {
  zh: '中文',
  en: 'English',
}
</script>

<template>
  <el-dropdown trigger="click" @command="switchTo">
    <span class="text-sm text-neutral-500 cursor-pointer hover:text-neutral-800 transition-colors duration-150 select-none">
      <span class="hidden sm:inline">{{ labels[locale] || locale }}</span>
      <span class="sm:hidden">🌐</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="lang in supportedLocales"
          :key="lang"
          :command="lang"
          :class="{ 'text-brand-600 font-medium': locale === lang }"
        >
          {{ labels[lang] || lang }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
