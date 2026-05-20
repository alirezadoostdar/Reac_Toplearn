import { useTranslation } from 'react-i18next'
import { Menu, Sun, Moon, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/store/uiStore'
import { RTL_LANGUAGES } from '@/i18n'

const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'fa', label: 'FA' },
  { code: 'ar', label: 'AR' },
]

export function Header() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme, toggleSidebar } = useUIStore()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    const dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lang)
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left: hamburger */}
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      {/* Right: controls */}
      <div className="flex items-center gap-1">
        {/* Language switcher */}
        <div className="flex items-center gap-0.5 rounded-md border border-border p-1">
          <Globe className="h-3.5 w-3.5 text-muted-foreground mx-1" />
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                i18n.language === lang.code
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} title={t('theme.toggle')}>
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  )
}
