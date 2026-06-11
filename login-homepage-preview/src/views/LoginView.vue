<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { UserFilled } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useI18n()
const router = useRouter()
const formRef = ref<FormInstance>()
const submitting = ref(false)
const loginError = ref('')

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const rules: FormRules = {
  email: [
    { required: true, message: t('login.validation.emailRequired'), trigger: 'blur' },
    { type: 'email', message: t('login.validation.emailInvalid'), trigger: 'blur' },
  ],
  password: [
    { required: true, message: t('login.validation.passwordRequired'), trigger: 'blur' },
    { min: 6, message: t('login.validation.passwordMinLength'), trigger: 'blur' },
  ],
}

const handleLogin = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  loginError.value = ''

  // Simulate login
  setTimeout(() => {
    submitting.value = false
    // For demo: always succeed and redirect
    router.push('/')
  }, 1200)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-blue-50 px-4">
    <div class="bg-white rounded-card shadow-sm border border-neutral-200 p-10 w-full max-w-[400px]">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-12 h-12 bg-brand-600 rounded-card mx-auto mb-4 flex items-center justify-center">
          <el-icon :size="24" color="white"><UserFilled /></el-icon>
        </div>
        <h1 class="text-xl font-semibold text-neutral-950">{{ t('login.title') }}</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ t('login.subtitle') }}</p>
      </div>

      <!-- Error Alert -->
      <el-alert
        v-if="loginError"
        :title="loginError"
        type="error"
        show-icon
        closable
        class="mb-6"
        @close="loginError = ''"
      />

      <!-- Form -->
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent="handleLogin"
      >
        <el-form-item :label="t('login.email')" prop="email">
          <el-input
            v-model="form.email"
            :placeholder="t('login.emailPlaceholder')"
            size="large"
            :prefix-icon="UserFilled"
          />
        </el-form-item>

        <el-form-item :label="t('login.password')" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            :placeholder="t('login.passwordPlaceholder')"
            size="large"
            show-password
          />
        </el-form-item>

        <div class="flex items-center justify-between mb-6">
          <el-checkbox v-model="form.remember" size="small">
            <span class="text-sm text-neutral-500">{{ t('login.rememberMe') }}</span>
          </el-checkbox>
          <a href="#" class="text-sm text-brand-600 no-underline hover:text-brand-700">{{ t('login.forgotPassword') }}</a>
        </div>

        <el-button
          type="primary"
          size="large"
          class="w-full"
          :loading="submitting"
          :disabled="submitting"
          @click="handleLogin"
        >
          {{ submitting ? t('login.submitting') : t('login.submit') }}
        </el-button>
      </el-form>
    </div>
  </div>
</template>
