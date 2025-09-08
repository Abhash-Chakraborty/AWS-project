'use client'

import { Amplify } from 'aws-amplify'
import { ReactNode } from 'react'

// Simple AWS configuration - API only, no authentication
const amplifyConfig = {
  API: {
    REST: {
      recipeapi: {
        endpoint: process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'https://z2yosk4enf.execute-api.ap-south-1.amazonaws.com',
        region: process.env.NEXT_PUBLIC_AWS_REGION || 'ap-south-1',
      },
    },
  },
  // Authentication removed
}

// Configure Amplify
try {
  Amplify.configure(amplifyConfig)
} catch (error) {
  console.error('Amplify configuration error:', error)
}

export default function ConfigureAmplifyClientSide({ children }: { children: ReactNode }) {
  // No auth checks needed - direct access to app
  return <>{children}</>
}
