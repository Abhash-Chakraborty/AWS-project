import type { Metadata } from 'next'
import './globals.css'
import ConfigureAmplify from '../lib/configureAmplify'

export const metadata: Metadata = {
  title: 'Recipe AI - Smart Recipe Recommendations',
  description: 'Find delicious recipes based on your ingredients using AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <ConfigureAmplify />
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
