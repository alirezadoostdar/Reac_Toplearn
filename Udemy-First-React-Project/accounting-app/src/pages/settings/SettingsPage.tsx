import { useTranslation } from 'react-i18next'
import { Globe, Palette, Monitor } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { PageHeader } from '@/components/shared/PageHeader'
import { useUIStore } from '@/store/uiStore'
import { RTL_LANGUAGES } from '@/i18n'
import { cn } from '@/lib/utils'

const LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English', dir: 'ltr' },
  { code: 'fa', label: 'Persian', nativeLabel: 'فارسی', dir: 'rtl' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl' },
]

export function SettingsPage() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useUIStore()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    const dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lang)
  }

  return (
    <div className="max-w-2xl">
      <PageHeader title={t('nav.settings')} />

      {/* Language Section */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">{t('language.select')}</CardTitle>
          </div>
          <CardDescription>
            Choose your preferred language and text direction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all hover:border-primary/50',
                  i18n.language === lang.code
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                )}
              >
                <span className="text-2xl font-bold">{lang.nativeLabel.charAt(0)}</span>
                <div>
                  <p className="text-sm font-medium">{lang.nativeLabel}</p>
                  <p className="text-xs text-muted-foreground">{lang.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground uppercase">{lang.dir}</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Theme Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">{t('theme.toggle')}</CardTitle>
          </div>
          <CardDescription>
            Switch between light and dark appearance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {(['light', 'dark'] as const).map((t_mode) => (
              <button
                key={t_mode}
                onClick={() => { if (theme !== t_mode) toggleTheme() }}
                className={cn(
                  'flex flex-col items-center gap-3 rounded-lg border-2 p-5 transition-all hover:border-primary/50',
                  theme === t_mode ? 'border-primary bg-primary/5' : 'border-border'
                )}
              >
                <Monitor className="h-6 w-6" />
                <span className="text-sm font-medium capitalize">{t(`theme.${t_mode}`)}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
