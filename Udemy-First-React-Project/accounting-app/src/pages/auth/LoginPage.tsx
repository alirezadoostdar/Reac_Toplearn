import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, TrendingUp, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormField } from '@/components/shared/FormField'
import { useAuthStore } from '@/store/authStore'
import { authService } from '@/services/authService'
import { toast } from '@/hooks/useToast'

const loginSchema = z.object({
  username: z.string().min(1, { message: 'required' }),
  password: z.string().min(1, { message: 'required' }),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const response = await authService.login(data)
      setAuth(response.token, response.user)
      navigate('/dashboard', { replace: true })
    } catch {
      setError('root', { message: t('auth.loginError') })
      toast({ title: t('auth.loginError'), variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -start-20 -top-20 h-64 w-64 rounded-full bg-primary/5" />
        <div className="absolute -bottom-32 -end-16 h-96 w-96 rounded-full bg-primary/5" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <TrendingUp className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">{t('app.name')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('app.tagline')}</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{t('auth.loginTitle')}</CardTitle>
            <CardDescription>{t('auth.loginSubtitle')}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              {/* Username */}
              <FormField
                label={t('auth.username')}
                error={errors.username && t('common.required')}
                required
                htmlFor="username"
              >
                <Input
                  id="username"
                  type="text"
                  placeholder={t('auth.usernamePlaceholder')}
                  autoComplete="username"
                  autoFocus
                  {...register('username')}
                  className={errors.username ? 'border-destructive focus-visible:ring-destructive' : ''}
                />
              </FormField>

              {/* Password */}
              <FormField
                label={t('auth.password')}
                error={errors.password && t('common.required')}
                required
                htmlFor="password"
              >
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('auth.passwordPlaceholder')}
                    autoComplete="current-password"
                    {...register('password')}
                    className={errors.password ? 'border-destructive focus-visible:ring-destructive pe-10' : 'pe-10'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 end-0 flex items-center pe-3 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormField>

              {/* Root error */}
              {errors.root && (
                <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {errors.root.message}
                </div>
              )}

              <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t('auth.loggingIn')}
                  </>
                ) : (
                  t('auth.login')
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
