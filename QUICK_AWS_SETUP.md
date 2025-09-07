# Quick AWS Setup Instructions

## Step 1: Create AWS Account
1. Go to https://console.aws.amazon.com/
2. Sign up for AWS account (free tier available)
3. Sign in to AWS Console

## Step 2: Create Cognito User Pool

1. **Search for "Cognito" in the AWS Console search bar**
2. **Click "Create user pool"**
3. **Configure sign-in experience**:
   - Sign-in options: ☑️ Email
   - Click "Next"

4. **Configure security requirements**:
   - Password policy: Use default
   - Multi-factor authentication: No MFA (for development)
   - Click "Next"

5. **Configure sign-up experience**:
   - Self-registration: ☑️ Enable self-registration
   - Required attributes: Email
   - Click "Next"

6. **Configure message delivery**:
   - Use default settings
   - Click "Next"

7. **Integrate your app**:
   - User pool name: `recipe-ai-users`
   - App client name: `recipe-ai-client`
   - ☑️ Generate a client secret: **UNCHECK THIS** (very important!)
   - Click "Next"

8. **Review and create**:
   - Click "Create user pool"

## Step 3: Get Your Credentials

After creation, you'll see:
- **User pool ID**: Copy this (looks like: us-east-1_aBcDeFgHi)
- **App client ID**: Go to "App integration" tab → "App clients" → Copy the client ID

## Step 4: Create Identity Pool

1. **In Cognito console, click "Identity pools" (legacy)**
2. **Click "Create new identity pool"**
3. **Identity pool name**: `recipe_ai_identity_pool`
4. **☑️ Enable access to unauthenticated identities**
5. **Authentication providers**:
   - Expand "Cognito"
   - User Pool ID: [paste your user pool ID]
   - App client id: [paste your app client ID]
6. **Click "Create Pool"**
7. **Allow the default IAM roles** (click "Allow")
8. **Copy the Identity pool ID** (looks like: us-east-1:12345678-1234-1234-1234-123456789012)

## Step 5: Update Your App

Replace the commented lines in your `.env.local` file:

```env
NEXT_PUBLIC_ENABLE_AUTH=true
NEXT_PUBLIC_USER_POOL_ID=us-east-1_aBcDeFgHi
NEXT_PUBLIC_USER_POOL_CLIENT_ID=1234567890abcdefghijklmnop
NEXT_PUBLIC_IDENTITY_POOL_ID=us-east-1:12345678-1234-1234-1234-123456789012
NEXT_PUBLIC_AWS_REGION=us-east-1
```

## Step 6: Test Your Setup

1. Save the `.env.local` file
2. Restart your dev server: `npm run dev`
3. Go to http://localhost:3000
4. You should now see the Amplify sign-in page!

## Troubleshooting

- **"User does not exist"**: This is normal - you can create a new account
- **Email not verified**: Check your email for verification link
- **CORS errors**: These will be resolved when you deploy to production

## Cost: FREE!
- Cognito free tier: 50,000 MAUs (Monthly Active Users)
- Perfect for development and small applications
