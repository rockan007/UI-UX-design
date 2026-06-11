import zh from './zh.json'
import en from './en.json'

export const messages = { zh, en }

export const numberFormats = {
  en: {
    currency: { style: 'currency', currency: 'USD' } as const,
    decimal: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 } as const,
    percent: { style: 'percent' } as const,
  },
  zh: {
    currency: { style: 'currency', currency: 'CNY' } as const,
    decimal: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 } as const,
    percent: { style: 'percent' } as const,
  },
}

export const datetimeFormats = {
  en: {
    short: { year: 'numeric', month: 'numeric', day: 'numeric' } as const,
    long: { year: 'numeric', month: 'long', day: 'numeric' } as const,
    datetime: { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' } as const,
  },
  zh: {
    short: { year: 'numeric', month: 'numeric', day: 'numeric' } as const,
    long: { year: 'numeric', month: 'long', day: 'numeric' } as const,
    datetime: { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' } as const,
  },
}
