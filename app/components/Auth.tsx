'use client'

import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import RecipeGenerator from './RecipeGenerator'

function Auth() {
  return (
    <div className="w-full max-w-2xl">
      <RecipeGenerator />
    </div>
  )
}

// Export the component wrapped with authentication
export default withAuthenticator(Auth, {
  signUpAttributes: ['email'],
  components: {
    Header() {
      return (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome to Recipe AI
          </h2>
          <p className="text-gray-600 mt-2">
            Sign in to start discovering amazing recipes
          </p>
        </div>
      )
    }
  }
})
