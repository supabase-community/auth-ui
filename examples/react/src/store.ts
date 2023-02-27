import { SocialLayout } from '@supabase/auth-ui-shared'
import { createContext, useContext } from 'react'

interface AppStateContextType {
  buttonColor: [string, React.Dispatch<React.SetStateAction<string>>]
  borderRadius: [string, React.Dispatch<React.SetStateAction<string>>]
  theme: [string, React.Dispatch<React.SetStateAction<string>>]
  socialLayout: [
    SocialLayout,
    React.Dispatch<React.SetStateAction<SocialLayout>>
  ]
}
export const AppState = createContext<AppStateContextType | null>(null)

export const useData = () => {
  const context = useContext(AppState)

  if (!context) {
    throw new Error('useData must be used within a <AppState.Provider>')
  }

  return context
}
