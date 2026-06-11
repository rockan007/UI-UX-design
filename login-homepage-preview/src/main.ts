import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createI18n } from 'vue-i18n'
import { messages, numberFormats, datetimeFormats } from './locales'
import { elLocaleMap } from './composables/useLocale'
import './style.css'
import App from './App.vue'
import router from './router'

const savedLocale = localStorage.getItem('locale') || 'zh'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'zh',
  messages,
  numberFormats,
  datetimeFormats,
})

const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(ElementPlus, {
  locale: elLocaleMap[savedLocale] || elLocaleMap['zh'],
})
app.mount('#app')
