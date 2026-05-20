import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus, Search, Pencil, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { PageHeader } from '@/components/shared/PageHeader'
import { BankFormDialog } from './BankFormDialog'
import { banksService } from '@/services/banksService'
import { toast } from '@/hooks/useToast'
import { formatDate, formatCurrency } from '@/lib/utils'
import type { Bank, BankFormData } from '@/types'

export function BanksPage() {
  const { t } = useTranslation()
  const [banks, setBanks] = useState<Bank[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editBank, setEditBank] = useState<Bank | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Bank | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchBanks = useCallback(async () => {
    setLoading(true)
    try {
      const result = await banksService.getAll(1, 100, search || undefined)
      setBanks(result.data)
    } catch {
      toast({ title: t('common.errorOccurred'), variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }, [search, t])

  useEffect(() => {
    const timer = setTimeout(fetchBanks, 300)
    return () => clearTimeout(timer)
  }, [fetchBanks])

  const handleSubmit = async (data: BankFormData) => {
    setIsSubmitting(true)
    try {
      if (editBank) {
        const updated = await banksService.update(editBank.id, data)
        setBanks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
      } else {
        const created = await banksService.create(data)
        setBanks((prev) => [created, ...prev])
      }
      toast({ title: t('common.saveSuccess'), variant: 'success' as never })
      setDialogOpen(false)
      setEditBank(null)
    } catch {
      toast({ title: t('common.errorOccurred'), variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      await banksService.delete(deleteTarget.id)
      setBanks((prev) => prev.filter((b) => b.id !== deleteTarget.id))
      toast({ title: t('common.deleteSuccess') })
    } catch {
      toast({ title: t('common.errorOccurred'), variant: 'destructive' })
    } finally {
      setDeleteTarget(null)
    }
  }

  const openAdd = () => {
    setEditBank(null)
    setDialogOpen(true)
  }

  const openEdit = (bank: Bank) => {
    setEditBank(bank)
    setDialogOpen(true)
  }

  return (
    <div>
      <PageHeader
        title={t('bank.title')}
        actions={
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4" />
            {t('bank.addBank')}
          </Button>
        }
      />

      {/* Search */}
      <div className="mb-4 relative max-w-sm">
        <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t('common.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ps-9"
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : banks.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-muted-foreground">
              {t('common.noData')}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                      {t('bank.name')}
                    </th>
                    <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                      {t('bank.accountNumber')}
                    </th>
                    <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                      {t('bank.iban')}
                    </th>
                    <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                      {t('bank.currency')}
                    </th>
                    <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                      {t('bank.balance')}
                    </th>
                    <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                      {t('common.status')}
                    </th>
                    <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                      {t('common.createdAt')}
                    </th>
                    <th className="px-4 py-3 text-end font-medium text-muted-foreground">
                      {t('common.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {banks.map((bank) => (
                    <tr key={bank.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{bank.name}</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">
                        {bank.accountNumber}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {bank.iban || '—'}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">{bank.currency}</Badge>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {formatCurrency(bank.balance, bank.currency)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={bank.isActive ? 'success' : 'secondary'}>
                          {bank.isActive ? t('common.active') : t('common.inactive')}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDate(bank.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(bank)}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteTarget(bank)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {banks.length > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          {t('common.total')}: {banks.length}
        </p>
      )}

      {/* Form Dialog */}
      <BankFormDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditBank(null) }}
        onSubmit={handleSubmit}
        editBank={editBank}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('common.confirm')}</AlertDialogTitle>
            <AlertDialogDescription>{t('common.deleteConfirm')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
