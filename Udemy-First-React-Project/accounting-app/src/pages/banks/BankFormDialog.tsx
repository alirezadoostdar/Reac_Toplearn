import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { FormField } from '@/components/shared/FormField'
import type { Bank, BankFormData } from '@/types'

const CURRENCIES = ['USD', 'EUR', 'GBP', 'IRR', 'SAR', 'AED', 'TRY', 'JPY', 'CNY']

// Form uses strings for inputs; we convert on submit
const bankSchema = z.object({
  name: z.string().min(1),
  accountNumber: z.string().min(5, { message: 'invalidAccountNumber' }),
  iban: z.string().optional(),
  swift: z.string().optional(),
  currency: z.string().min(1),
  branch: z.string().optional(),
  balanceStr: z.string().refine((v) => !isNaN(Number(v)), { message: 'invalidBalance' }),
  isActive: z.boolean(),
})

type BankFormFields = z.infer<typeof bankSchema>

interface BankFormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: BankFormData) => Promise<void>
  editBank?: Bank | null
  isSubmitting?: boolean
}

export function BankFormDialog({
  open,
  onClose,
  onSubmit,
  editBank,
  isSubmitting = false,
}: BankFormDialogProps) {
  const { t } = useTranslation()
  const isEditing = !!editBank

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BankFormFields>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      currency: 'USD',
      balanceStr: '0',
      isActive: true,
    },
  })

  useEffect(() => {
    if (open) {
      if (editBank) {
        reset({ ...editBank, balanceStr: String(editBank.balance) })
      } else {
        reset({ currency: 'USD', balanceStr: '0', isActive: true })
      }
    }
  }, [open, editBank, reset])

  const handleClose = () => {
    reset()
    onClose()
  }

  const getErr = (error?: { message?: string }) => {
    if (!error) return undefined
    const msg = error.message || ''
    if (msg === 'invalidBalance') return t('bank.invalidBalance')
    if (msg === 'invalidAccountNumber') return t('bank.invalidAccountNumber')
    return t('common.required')
  }

  const handleFormSubmit = (data: BankFormFields) => {
    const { balanceStr, ...rest } = data
    return onSubmit({ ...rest, balance: Number(balanceStr) })
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? t('bank.editBank') : t('bank.addBank')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className="grid gap-4 py-4">
            {/* Bank Name */}
            <FormField
              label={t('bank.name')}
              error={getErr(errors.name)}
              required
              htmlFor="bankName"
            >
              <Input
                id="bankName"
                placeholder={t('bank.namePlaceholder')}
                {...register('name')}
                className={errors.name ? 'border-destructive' : ''}
              />
            </FormField>

            {/* Account Number / Currency */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label={t('bank.accountNumber')}
                error={getErr(errors.accountNumber)}
                required
                htmlFor="accountNumber"
              >
                <Input
                  id="accountNumber"
                  placeholder={t('bank.accountNumberPlaceholder')}
                  {...register('accountNumber')}
                  className={errors.accountNumber ? 'border-destructive' : ''}
                />
              </FormField>

              <FormField
                label={t('bank.currency')}
                error={getErr(errors.currency)}
                required
              >
                <Controller
                  name="currency"
                  control={control}
                  render={({ field: currencyField }) => (
                    <Select value={currencyField.value} onValueChange={currencyField.onChange}>
                      <SelectTrigger className={errors.currency ? 'border-destructive' : ''}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>
            </div>

            {/* IBAN / SWIFT */}
            <div className="grid grid-cols-2 gap-4">
              <FormField label={t('bank.iban')} htmlFor="iban">
                <Input id="iban" placeholder={t('bank.ibanPlaceholder')} {...register('iban')} />
              </FormField>
              <FormField label={t('bank.swift')} htmlFor="swift">
                <Input id="swift" placeholder={t('bank.swiftPlaceholder')} {...register('swift')} />
              </FormField>
            </div>

            {/* Branch / Balance */}
            <div className="grid grid-cols-2 gap-4">
              <FormField label={t('bank.branch')} htmlFor="branch">
                <Input id="branch" placeholder={t('bank.branchPlaceholder')} {...register('branch')} />
              </FormField>
              <FormField
                label={t('bank.balance')}
                error={getErr(errors.balanceStr)}
                required
                htmlFor="balance"
              >
                <Input
                  id="balance"
                  type="number"
                  step="0.01"
                  placeholder={t('bank.balancePlaceholder')}
                  {...register('balanceStr')}
                  className={errors.balanceStr ? 'border-destructive' : ''}
                />
              </FormField>
            </div>

            {/* isActive toggle */}
            <div className="flex items-center gap-3 rounded-md border border-border p-3">
              <Controller
                name="isActive"
                control={control}
                render={({ field: activeField }) => (
                  <Switch
                    id="isActive"
                    checked={activeField.value}
                    onCheckedChange={activeField.onChange}
                  />
                )}
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                {t('bank.isActive')}
              </Label>
            </div>
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
