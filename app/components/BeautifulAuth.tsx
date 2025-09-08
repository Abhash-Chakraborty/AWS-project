'use client'

import { useState, createContext, useContext, useEffect } from 'react'
import { Authenticator, ThemeProvider, Theme } from '@aws-amplify/ui-react'
import { signOut, getCurrentUser, AuthUser } from 'aws-amplify/auth'
import '@aws-amplify/ui-react/styles.css'

// Custom theme for a more aesthetic look
const customTheme: Theme = {
  name: 'RecipeAI-Theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: '#fef7ee',
          20: '#fdedd3',
          40: '#fb923c',
          60: '#ea580c',
          80: '#c2410c',
          90: '#9a3412',
          100: '#7c2d12',
        },
      },
      background: {
        primary: '#ffffff',
        secondary: '#f8fafc',
      },
    },
    components: {
      authenticator: {
        router: {
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
        form: {
          padding: '2rem',
        },
      },
      button: {
        primary: {
          backgroundColor: '{colors.brand.primary.80}',
          color: '{colors.neutral.10}',
          _hover: {
            backgroundColor: '{colors.brand.primary.90}',
          },
        },
      },
      fieldcontrol: {
        borderColor: '{colors.neutral.40}',
        _focus: {
          borderColor: '{colors.brand.primary.80}',
          boxShadow: '0 0 0 2px {colors.brand.primary.20}',
        },
      },
    },
  },
}

interface User {
  id: string
  name: string
  email: string
  attributes?: any
}

interface AuthContextType {
  user: User | null
  logout: () => Promise<void>
  isAuthenticated: boolean
  isLoading: boolean
  checkAuthState: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (currentUser) {
        setUser({
          id: currentUser.userId,
          name: currentUser.signInDetails?.loginId || 'User',
          email: currentUser.signInDetails?.loginId || '',
          attributes: currentUser
        })
      }
    } catch (error) {
      console.log('No authenticated user')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut()
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const value = {
    user,
    logout,
    isAuthenticated: !!user,
    isLoading,
    checkAuthState
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// AWS Cognito Authentication Wrapper
interface AuthWrapperProps {
  children: React.ReactNode
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <Authenticator
        hideSignUp={false}
        loginMechanisms={['email']}
        signUpAttributes={['email', 'name']}
        components={{
          Header() {
            return (
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🍳</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Recipe AI</h2>
                <p className="text-gray-600">Sign in to get personalized recipe recommendations</p>
              </div>
            )
          },
          Footer() {
            return (
              <div className="text-center mt-6 text-sm text-gray-500">
                Secure authentication powered by AWS Cognito
              </div>
            )
          }
        }}
        formFields={{
          signUp: {
            name: {
              order: 1,
              placeholder: 'Enter your full name',
              label: 'Full Name *',
              required: true,
            },
            email: {
              order: 2,
              placeholder: 'Enter your email address',
              label: 'Email *',
              required: true,
            },
            password: {
              order: 3,
              placeholder: 'Enter your password',
              label: 'Password *',
              required: true,
            },
            confirm_password: {
              order: 4,
              placeholder: 'Confirm your password',
              label: 'Confirm Password *',
              required: true,
            },
          },
          signIn: {
            username: {
              placeholder: 'Enter your email address',
              label: 'Email',
            },
            password: {
              placeholder: 'Enter your password',
              label: 'Password',
            },
          },
        }}
      >
        {({ signOut, user }: { signOut?: () => void; user?: AuthUser }) => {
          return <AuthenticatedApp user={user} signOut={signOut}>{children}</AuthenticatedApp>
        }}
      </Authenticator>
    </ThemeProvider>
  )
}

// Authenticated App Component
interface AuthenticatedAppProps {
  children: React.ReactNode
  user?: AuthUser
  signOut?: () => void
}

function AuthenticatedApp({ children, user, signOut }: AuthenticatedAppProps) {
  const { checkAuthState } = useAuth()

  useEffect(() => {
    if (user) {
      // Update auth context when user is authenticated
      checkAuthState()
    }
  }, [user, checkAuthState])

  return <>{children}</>
}

// Beautiful user profile component
interface UserProfileProps {
  user: User
  onLogout: () => Promise<void>
}

export function UserProfile({ user, onLogout }: UserProfileProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl px-4 py-2 transition-all duration-200 border border-orange-200 hover:border-orange-300"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-gray-800">{user.name}</p>
          <p className="text-xs text-gray-600">{user.email}</p>
        </div>
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl border border-orange-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-orange-100">
            <p className="text-sm font-medium text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-600">{user.email}</p>
          </div>
          <button
            onClick={async () => {
              await onLogout()
              setShowDropdown(false)
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
          >
            <span className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
