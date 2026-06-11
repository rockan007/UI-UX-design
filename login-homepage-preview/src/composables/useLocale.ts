import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

export const elLocaleMap: Record<string, typeof zhCn> = {
  zh: zhCn,
  en: en,
}

export function useLocale() {
  const { locale } = useI18n({ useScope: 'global' })

  const supportedLocales = Object.keys(elLocaleMap)

  const switchTo = (lang: string) => {
    if (!supportedLocales.includes(lang)) return
    locale.value = lang
    localStorage.setItem('locale', lang)
    document.documentElement.lang = lang
    // RTL support (future-proof): only ar/he/fa/ur trigger dir change
    const rtlLangs = ['ar', 'he', 'fa', 'ur']
    document.documentElement.dir = rtlLangs.includes(lang) ? 'rtl' : 'ltr'
  }

  return { locale, switchTo, supportedLocales }
}
