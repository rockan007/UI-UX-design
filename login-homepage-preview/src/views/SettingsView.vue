<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

const { t } = useI18n()

// ── Tab config ──────────────────────────────────────
const activeTab = ref('basic')

const tabs = [
  { key: 'basic', labelKey: 'settings.tabs.basic', color: 'blue' },
  { key: 'security', labelKey: 'settings.tabs.security', color: 'cyan' },
  { key: 'notification', labelKey: 'settings.tabs.notification', color: 'purple' },
]

const showTabBar = computed(() => tabs.length >= 2)

// ── Form State ──────────────────────────────────────
const formRef = ref<FormInstance>()
const saving = ref(false)

const form = reactive({
  // Basic
  siteName: '管理系统',
  logoUrl: '',
  adminEmail: 'admin@example.com',
  description: '',
  // Security
  passwordMinLength: 8,
  lockoutThreshold: 5,
  sessionTimeout: 30,
  // Notification
  emailNotification: true,
  smsNotification: false,
  notificationEmail: 'notify@example.com',
})

// ── Methods ─────────────────────────────────────────
async function handleSave() {
  saving.value = true
  // Simulate save
  await new Promise(resolve => setTimeout(resolve, 600))
  ElMessage.success(t('settings.saveSuccess'))
  saving.value = false
}
</script>

<template>
  <div>
    <!-- Toolbar: page header + actions -->
    <div class="flex items-start justify-between mb-4 md:mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-neutral-950">{{ t('settings.title') }}</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ t('settings.description') }}</p>
      </div>
      <div class="flex items-center gap-3 pt-1">
        <el-button type="primary" :loading="saving" :disabled="saving" @click="handleSave">
          {{ t('common.save') }}
        </el-button>
      </div>
    </div>

    <!-- Tab Bar: Desktop -->
    <el-tabs
      v-if="showTabBar"
      v-model="activeTab"
      tab-position="top"
      class="hidden md:block"
    >
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.key"
        :name="tab.key"
        :label="t(tab.labelKey)"
      />
    </el-tabs>

    <!-- Form -->
    <el-form
      ref="formRef"
      :model="form"
      label-position="top"
      class="flex flex-col gap-4"
      @submit.prevent="handleSave()"
    >
      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- DESKTOP TAB PANE: basic (blue) -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div v-show="!showTabBar || activeTab === 'basic'" :class="showTabBar ? 'hidden md:block' : ''">
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-blue-600 p-5 md:p-6">
          <div class="text-sm font-semibold text-blue-700 mb-4 uppercase tracking-wide">{{ t('settings.basic.header') }}</div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <el-form-item :label="t('settings.basic.siteName')">
              <el-input v-model="form.siteName" :placeholder="t('settings.basic.siteNamePlaceholder')" />
            </el-form-item>
            <el-form-item :label="t('settings.basic.logoUrl')">
              <el-input v-model="form.logoUrl" :placeholder="t('settings.basic.logoUrlPlaceholder')" />
            </el-form-item>
            <el-form-item :label="t('settings.basic.adminEmail')">
              <el-input v-model="form.adminEmail" :placeholder="t('settings.basic.adminEmailPlaceholder')" />
            </el-form-item>
          </div>

          <el-form-item :label="t('settings.basic.description')" class="mt-4 mb-0">
            <el-input v-model="form.description" type="textarea" :rows="3" :placeholder="t('settings.basic.descriptionPlaceholder')" />
          </el-form-item>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- DESKTOP TAB PANE: security (cyan) -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div v-show="!showTabBar || activeTab === 'security'" :class="showTabBar ? 'hidden md:block' : ''">
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-cyan-600 p-5 md:p-6">
          <div class="text-sm font-semibold text-cyan-700 mb-4 uppercase tracking-wide">{{ t('settings.security.header') }}</div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <el-form-item :label="t('settings.security.passwordMinLength')">
              <el-input-number v-model="form.passwordMinLength" :min="4" :max="32" class="w-full" />
            </el-form-item>
            <el-form-item :label="t('settings.security.lockoutThreshold')">
              <el-input-number v-model="form.lockoutThreshold" :min="1" :max="20" class="w-full" />
            </el-form-item>
            <el-form-item :label="t('settings.security.sessionTimeout')">
              <el-input-number v-model="form.sessionTimeout" :min="5" :max="1440" class="w-full" />
            </el-form-item>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- DESKTOP TAB PANE: notification (purple) -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div v-show="!showTabBar || activeTab === 'notification'" :class="showTabBar ? 'hidden md:block' : ''">
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-purple-600 p-5 md:p-6">
          <div class="text-sm font-semibold text-purple-700 mb-4 uppercase tracking-wide">{{ t('settings.notification.header') }}</div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <el-form-item :label="t('settings.notification.emailNotification')">
              <el-switch v-model="form.emailNotification" />
            </el-form-item>
            <el-form-item :label="t('settings.notification.smsNotification')">
              <el-switch v-model="form.smsNotification" />
            </el-form-item>
            <el-form-item :label="t('settings.notification.notificationEmail')">
              <el-input v-model="form.notificationEmail" :placeholder="t('settings.notification.notificationEmailPlaceholder')" />
            </el-form-item>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════════════════ -->
      <!-- MOBILE: flat section cards -->
      <!-- ══════════════════════════════════════════════════════════ -->
      <div class="md:hidden flex flex-col gap-4">
        <!-- Mobile: basic (blue) -->
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-blue-600 p-5">
          <div class="text-sm font-semibold text-blue-700 mb-4 uppercase tracking-wide">{{ t('settings.basic.header') }}</div>
          <div class="grid grid-cols-1 gap-4">
            <el-form-item :label="t('settings.basic.siteName')">
              <el-input v-model="form.siteName" :placeholder="t('settings.basic.siteNamePlaceholder')" />
            </el-form-item>
            <el-form-item :label="t('settings.basic.logoUrl')">
              <el-input v-model="form.logoUrl" :placeholder="t('settings.basic.logoUrlPlaceholder')" />
            </el-form-item>
            <el-form-item :label="t('settings.basic.adminEmail')">
              <el-input v-model="form.adminEmail" :placeholder="t('settings.basic.adminEmailPlaceholder')" />
            </el-form-item>
            <el-form-item :label="t('settings.basic.description')" class="mb-0">
              <el-input v-model="form.description" type="textarea" :rows="3" :placeholder="t('settings.basic.descriptionPlaceholder')" />
            </el-form-item>
          </div>
        </div>

        <!-- Mobile: security (cyan) -->
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-cyan-600 p-5">
          <div class="text-sm font-semibold text-cyan-700 mb-4 uppercase tracking-wide">{{ t('settings.security.header') }}</div>
          <div class="grid grid-cols-1 gap-4">
            <el-form-item :label="t('settings.security.passwordMinLength')">
              <el-input-number v-model="form.passwordMinLength" :min="4" :max="32" class="w-full" />
            </el-form-item>
            <el-form-item :label="t('settings.security.lockoutThreshold')">
              <el-input-number v-model="form.lockoutThreshold" :min="1" :max="20" class="w-full" />
            </el-form-item>
            <el-form-item :label="t('settings.security.sessionTimeout')" class="mb-0">
              <el-input-number v-model="form.sessionTimeout" :min="5" :max="1440" class="w-full" />
            </el-form-item>
          </div>
        </div>

        <!-- Mobile: notification (purple) -->
        <div class="bg-white rounded-btn border border-neutral-200 border-l-[3px] border-l-purple-600 p-5">
          <div class="text-sm font-semibold text-purple-700 mb-4 uppercase tracking-wide">{{ t('settings.notification.header') }}</div>
          <div class="grid grid-cols-1 gap-4">
            <el-form-item :label="t('settings.notification.emailNotification')">
              <el-switch v-model="form.emailNotification" />
            </el-form-item>
            <el-form-item :label="t('settings.notification.smsNotification')">
              <el-switch v-model="form.smsNotification" />
            </el-form-item>
            <el-form-item :label="t('settings.notification.notificationEmail')" class="mb-0">
              <el-input v-model="form.notificationEmail" :placeholder="t('settings.notification.notificationEmailPlaceholder')" />
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
