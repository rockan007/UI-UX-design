<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { UserFilled } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

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
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少 6 位', trigger: 'blur' },
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
        <h1 class="text-xl font-semibold text-neutral-950">欢迎回来</h1>
        <p class="text-sm text-neutral-500 mt-1">登录您的账号以继续</p>
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
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="form.email"
            placeholder="name@example.com"
            size="large"
            :prefix-icon="UserFilled"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            show-password
          />
        </el-form-item>

        <div class="flex items-center justify-between mb-6">
          <el-checkbox v-model="form.remember" size="small">
            <span class="text-sm text-neutral-500">记住我</span>
          </el-checkbox>
          <a href="#" class="text-sm text-brand-600 no-underline hover:text-brand-700">忘记密码？</a>
        </div>

        <el-button
          type="primary"
          size="large"
          class="w-full"
          :loading="submitting"
          :disabled="submitting"
          @click="handleLogin"
        >
          {{ submitting ? '登录中...' : '登录' }}
        </el-button>
      </el-form>
    </div>
  </div>
</template>
