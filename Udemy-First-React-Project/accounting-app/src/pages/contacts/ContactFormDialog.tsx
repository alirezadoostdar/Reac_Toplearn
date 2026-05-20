import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { FormField } from '@/components/shared/FormField'
import type { Contact, ContactFormData } from '@/types'

const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7).regex(/^[+\d\s\-()]+$/, 'invalidPhone'),
  company: z.string().optional(),
  type: z.enum(['customer', 'supplier', 'both']),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  taxId: z.string().optional(),
  notes: z.string().optional(),
})

interface ContactFormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: ContactFormData) => Promise<void>
  editContact?: Contact | null
  isSubmitting?: boolean
}

export function ContactFormDialog({
  open,
  onClose,
  onSubmit,
  editContact,
  isSubmitting = false,
}: ContactFormDialogProps) {
  const { t } = useTranslation()
  const isEditing = !!editContact

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type: 'customer',
    },
  })

  useEffect(() => {
    if (open) {
      if (editContact) {
        reset(editContact)
      } else {
        reset({ type: 'customer' })
      }
    }
  }, [open, editContact, reset])

  const handleClose = () => {
    reset()
    onClose()
  }

  const getErrorMessage = (_fieldName: string, error?: { message?: string }) => {
    if (!error) return undefined
    const key = error.message || ''
    if (key === 'invalidPhone') return t('contact.invalidPhone')
    if (key === 'Invalid email') return t('contact.invalidEmail')
    return t('common.required')
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? t('contact.editContact') : t('contact.addContact')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-4 py-4">
            {/* Row 1: First / Last name */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label={t('contact.firstName')}
                error={getErrorMessage('firstName', errors.firstName)}
                required
                htmlFor="firstName"
              >
                <Input
                  id="firstName"
                  placeholder={t('contact.firstNamePlaceholder')}
                  {...register('firstName')}
                  className={errors.firstName ? 'border-destructive' : ''}
                />
              </FormField>

              <FormField
                label={t('contact.lastName')}
                error={getErrorMessage('lastName', errors.lastName)}
                required
                htmlFor="lastName"
              >
                <Input
                  id="lastName"
                  placeholder={t('contact.lastNamePlaceholder')}
                  {...register('lastName')}
                  className={errors.lastName ? 'border-destructive' : ''}
                />
              </FormField>
            </div>

            {/* Row 2: Email / Phone */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label={t('contact.email')}
                error={getErrorMessage('email', errors.email)}
                required
                htmlFor="email"
              >
                <Input
                  id="email"
                  type="email"
                  placeholder={t('contact.emailPlaceholder')}
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                />
              </FormField>

              <FormField
                label={t('contact.phone')}
                error={getErrorMessage('phone', errors.phone)}
                required
                htmlFor="phone"
              >
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t('contact.phonePlaceholder')}
                  {...register('phone')}
                  className={errors.phone ? 'border-destructive' : ''}
                />
              </FormField>
            </div>

            {/* Row 3: Company / Type */}
            <div className="grid grid-cols-2 gap-4">
              <FormField label={t('contact.company')} htmlFor="company">
                <Input
                  id="company"
                  placeholder={t('contact.companyPlaceholder')}
                  {...register('company')}
                />
              </FormField>

              <FormField
                label={t('contact.type')}
                error={getErrorMessage('type', errors.type)}
                required
              >
                <Controller
                  name="type"
                  control={control}
                  render={({ field: typeField }) => (
                    <Select value={typeField.value} onValueChange={typeField.onChange}>
                      <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">{t('contact.types.customer')}</SelectItem>
                        <SelectItem value="supplier">{t('contact.types.supplier')}</SelectItem>
                        <SelectItem value="both">{t('contact.types.both')}</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>
            </div>

            {/* Row 4: Address */}
            <FormField label={t('contact.address')} htmlFor="address">
              <Input
                id="address"
                placeholder={t('contact.addressPlaceholder')}
                {...register('address')}
              />
            </FormField>

            {/* Row 5: City / Country / TaxID */}
            <div className="grid grid-cols-3 gap-4">
              <FormField label={t('contact.city')} htmlFor="city">
                <Input id="city" placeholder={t('contact.cityPlaceholder')} {...register('city')} />
              </FormField>
              <FormField label={t('contact.country')} htmlFor="country">
                <Input id="country" placeholder={t('contact.countryPlaceholder')} {...register('country')} />
              </FormField>
              <FormField label={t('contact.taxId')} htmlFor="taxId">
                <Input id="taxId" placeholder={t('contact.taxIdPlaceholder')} {...register('taxId')} />
              </FormField>
            </div>

            {/* Notes */}
            <FormField label={t('contact.notes')} htmlFor="notes">
              <Textarea
                id="notes"
                placeholder={t('contact.notesPlaceholder')}
                rows={3}
                {...register('notes')}
              />
            </FormField>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {t('common.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
