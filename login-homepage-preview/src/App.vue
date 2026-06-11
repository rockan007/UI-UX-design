<script setup lang="ts">
import { watch, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { elLocaleMap } from '@/composables/useLocale'

const { locale } = useI18n({ useScope: 'global' })

const elConfig = reactive({ locale: elLocaleMap[locale.value] || elLocaleMap['zh'] })

watch(locale, (lang) => {
  elConfig.locale = elLocaleMap[lang] || elLocaleMap['zh']
})
</script>

<template>
  <el-config-provider :locale="elConfig.locale">
    <router-view />
  </el-config-provider>
</template>
