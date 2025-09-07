// AWS Amplify Configuration
// Replace these values with your actual AWS Amplify project credentials

export const amplifyConfig = {
  Auth: {
    Cognito: {
      // Get these values from your AWS Cognito User Pool
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || 'us-east-1_XXXXXXXXX',
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
      identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID || 'us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
      // For web apps, client secret should NOT be used
      // If your app client has a secret, create a new one without it
      loginWith: {
        oauth: {
          domain: process.env.NEXT_PUBLIC_OAUTH_DOMAIN,
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN || 'http://localhost:3000/',
          redirectSignOut: process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT || 'http://localhost:3000/',
          responseType: 'code'
        },
        username: true,
        email: true
      }
    }
  },
  API: {
    REST: {
      recipeApi: {
        // Replace with your API Gateway endpoint
        endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://your-api-gateway-url.execute-api.us-east-1.amazonaws.com/dev',
        region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1'
      }
    }
  }
}

// For development, you can temporarily disable auth by setting this to false
export const ENABLE_AUTH = process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true'
