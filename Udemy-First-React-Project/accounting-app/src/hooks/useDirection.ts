import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { RTL_LANGUAGES } from '@/i18n'

export function useDirection() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = i18n.language
    const dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lang)
  }, [i18n.language])
}
