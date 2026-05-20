import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Users, Building2, UserCheck, Truck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/shared/PageHeader'
import { useAuthStore } from '@/store/authStore'
import { contactsService } from '@/services/contactsService'
import { banksService } from '@/services/banksService'

interface Stats {
  totalContacts: number
  customers: number
  suppliers: number
  totalBanks: number
}

export function DashboardPage() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const [stats, setStats] = useState<Stats>({ totalContacts: 0, customers: 0, suppliers: 0, totalBanks: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contacts, banks] = await Promise.all([
          contactsService.getAll(1, 1000),
          banksService.getAll(1, 1000),
        ])
        const customers = contacts.data.filter((c) => c.type === 'customer' || c.type === 'both').length
        const suppliers = contacts.data.filter((c) => c.type === 'supplier' || c.type === 'both').length
        setStats({
          totalContacts: contacts.total,
          customers,
          suppliers,
          totalBanks: banks.total,
        })
      } catch {
        // Stats unavailable — show zeros
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { label: t('dashboard.totalContacts'), value: stats.totalContacts, icon: Users, color: 'text-blue-600' },
    { label: t('dashboard.customers'), value: stats.customers, icon: UserCheck, color: 'text-green-600' },
    { label: t('dashboard.suppliers'), value: stats.suppliers, icon: Truck, color: 'text-orange-600' },
    { label: t('dashboard.totalBanks'), value: stats.totalBanks, icon: Building2, color: 'text-purple-600' },
  ]

  return (
    <div>
      <PageHeader
        title={t('dashboard.title')}
        description={`${t('dashboard.welcome')}, ${user?.fullName || user?.username}!`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label} className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-8 w-16 animate-pulse rounded bg-muted" />
              ) : (
                <div className="text-3xl font-bold">{card.value.toLocaleString()}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
