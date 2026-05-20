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
import { ContactFormDialog } from './ContactFormDialog'
import { contactsService } from '@/services/contactsService'
import { toast } from '@/hooks/useToast'
import { formatDate } from '@/lib/utils'
import type { Contact, ContactFormData } from '@/types'

export function ContactsPage() {
  const { t } = useTranslation()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editContact, setEditContact] = useState<Contact | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchContacts = useCallback(async () => {
    setLoading(true)
    try {
      const result = await contactsService.getAll(1, 100, search || undefined)
      setContacts(result.data)
    } catch {
      toast({ title: t('common.errorOccurred'), variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }, [search, t])

  useEffect(() => {
    const timer = setTimeout(fetchContacts, 300)
    return () => clearTimeout(timer)
  }, [fetchContacts])

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      if (editContact) {
        const updated = await contactsService.update(editContact.id, data)
        setContacts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
      } else {
        const created = await contactsService.create(data)
        setContacts((prev) => [created, ...prev])
      }
      toast({ title: t('common.saveSuccess'), variant: 'success' as never })
      setDialogOpen(false)
      setEditContact(null)
    } catch {
      toast({ title: t('common.errorOccurred'), variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      await contactsService.delete(deleteTarget.id)
      setContacts((prev) => prev.filter((c) => c.id !== deleteTarget.id))
      toast({ title: t('common.deleteSuccess') })
    } catch {
      toast({ title: t('common.errorOccurred'), variant: 'destructive' })
    } finally {
      setDeleteTarget(null)
    }
  }

  const openAdd = () => {
    setEditContact(null)
    setDialogOpen(true)
  }

  const openEdit = (contact: Contact) => {
    setEditContact(contact)
    setDialogOpen(true)
  }

  const typeVariant = (type: Contact['type']) => {
    if (type === 'customer') return 'success'
    if (type === 'supplier') return 'warning'
    return 'secondary'
  }

  return (
    <div>
      <PageHeader
        title={t('contact.title')}
        actions={
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4" />
            {t('contact.addContact')}
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
          ) : contacts.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-muted-foreground">
              {t('common.noData')}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                      {t('contact.firstName')} / {t('contact.lastName')}
                    </th>
                    <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                      {t('contact.email')}
                    </th>
                    <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                      {t('contact.phone')}
                    </th>
                    <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                      {t('contact.company')}
                    </th>
                    <th className="px-4 py-3 text-start font-medium text-muted-foreground">
                      {t('contact.type')}
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
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">
                        {contact.firstName} {contact.lastName}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{contact.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{contact.phone}</td>
                      <td className="px-4 py-3 text-muted-foreground">{contact.company || '—'}</td>
                      <td className="px-4 py-3">
                        <Badge variant={typeVariant(contact.type) as never}>
                          {t(`contact.types.${contact.type}`)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDate(contact.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(contact)}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteTarget(contact)}
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

      {/* Total */}
      {contacts.length > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          {t('common.total')}: {contacts.length}
        </p>
      )}

      {/* Form Dialog */}
      <ContactFormDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditContact(null) }}
        onSubmit={handleSubmit}
        editContact={editContact}
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
