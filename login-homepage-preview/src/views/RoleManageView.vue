<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div>
    <el-breadcrumb separator="/" class="mb-4 md:mb-6">
      <el-breadcrumb-item>{{ t('users.roles.title') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bg-white rounded-btn border border-neutral-200 p-8 text-center text-sm text-neutral-500">
      {{ t('users.roles.placeholder') }}
    </div>
  </div>
</template>
