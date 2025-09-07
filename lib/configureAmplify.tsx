'use client'

import { Amplify } from 'aws-amplify'
import awsconfig from '../src/aws-exports.js'

// Configure Amplify
Amplify.configure(awsconfig)

export default function ConfigureAmplify() {
  return null // This component doesn't render anything
}
