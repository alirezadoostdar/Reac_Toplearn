import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LayoutDashboard, Users, Building2, Settings, LogOut, X, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { authService } from '@/services/authService'
import { toast } from '@/hooks/useToast'

const navItems = [
  { key: 'dashboard', path: '/dashboard', icon: LayoutDashboard },
  { key: 'contacts', path: '/contacts', icon: Users },
  { key: 'banks', path: '/banks', icon: Building2 },
  { key: 'settings', path: '/settings', icon: Settings },
]

export function Sidebar() {
  const { t } = useTranslation()
  const { user, clearAuth } = useAuthStore()
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch {
      // Ignore logout API errors - clear local state regardless
    } finally {
      clearAuth()
      toast({ title: t('auth.logoutSuccess'), variant: 'default' })
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 start-0 z-30 flex w-[var(--sidebar-width)] flex-col bg-card border-e border-border transition-transform duration-300 ease-in-out',
          'lg:static lg:translate-x-0',
          !sidebarOpen && '-translate-x-full rtl:translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">{t('app.name')}</p>
              <p className="text-xs text-muted-foreground">{t('app.tagline')}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map(({ key, path, icon: Icon }) => (
              <li key={key}>
                <NavLink
                  to={path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {t(`nav.${key}`)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Separator />

        {/* User section */}
        <div className="p-4">
          <div className="mb-3 flex items-center gap-3 rounded-md bg-muted px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {user?.fullName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user?.fullName || user?.username}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {t('nav.logout')}
          </Button>
        </div>
      </aside>
    </>
  )
}
