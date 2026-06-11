<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-neutral-950">{{ t('settings.title') }}</h1>
      <p class="text-sm text-neutral-500 mt-1">{{ t('settings.description') }}</p>
    </div>
    <div class="bg-white rounded-btn border border-neutral-200 p-12 flex items-center justify-center">
      <p class="text-neutral-500 text-sm">{{ t('settings.placeholder') }}</p>
    </div>
  </div>
</template>
