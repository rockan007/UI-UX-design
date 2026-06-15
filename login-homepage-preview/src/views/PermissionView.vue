<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div>
    <div class="mb-4 md:mb-6">
      <h1 class="text-2xl font-semibold text-neutral-950">{{ t('users.permissions.title') }}</h1>
      <p class="text-sm text-neutral-500 mt-1">{{ t('users.permissions.description') }}</p>
    </div>
    <div class="bg-white rounded-btn border border-neutral-200 p-8 text-center text-sm text-neutral-500">
      {{ t('users.permissions.placeholder') }}
    </div>
  </div>
</template>
