import { useTheme } from '@/hooks/useTheme'
import { useDirection } from '@/hooks/useDirection'
import { AppRouter } from './AppRouter'
import { Toaster } from '@/components/ui/toaster'

function AppProviders() {
  useTheme()
  useDirection()
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  )
}

export default function App() {
  return <AppProviders />
}
