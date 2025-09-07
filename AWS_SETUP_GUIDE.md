# AWS Setup Guide for Recipe AI

This guide will help you set up real AWS credentials for your Recipe AI application.

## Quick Start (Development Mode)

The app is currently configured to run **without authentication** for development. You can test all features immediately!

## Setting Up Real AWS Credentials

### Step 1: Create AWS Account
1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Create an AWS account if you don't have one
3. Sign in to your AWS Console

### Step 2: Set Up Cognito User Pool

1. **Navigate to Amazon Cognito**:
   - Go to AWS Console → Services → Amazon Cognito

2. **Create User Pool**:
   ```
   - Click "Create user pool"
   - Choose "Email" as sign-in option
   - Configure password requirements (use defaults)
   - Enable MFA (optional)
   - Configure app integration:
     - App client name: "recipe-ai-client"
     - Generate client secret: NO (uncheck this)
   - Create the user pool
   ```

3. **Get Your Credentials**:
   After creation, you'll see:
   - **User Pool ID**: `us-east-1_XXXXXXXXX`
   - **App Client ID**: `xxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 3: Create Identity Pool

1. **Navigate to Identity Pools**:
   - In Cognito console, click "Identity pools"
   - Click "Create identity pool"

2. **Configure Identity Pool**:
   ```
   - Identity pool name: "recipe-ai-identity-pool"
   - Enable "Unauthenticated identities"
   - Authentication providers:
     - Cognito: Add your User Pool ID and App Client ID
   - Create pool
   ```

3. **Get Identity Pool ID**: `us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

### Step 4: Set Up API Gateway (Optional)

1. **Create API Gateway**:
   - Go to AWS Console → API Gateway
   - Create REST API
   - Name: "recipe-ai-api"

2. **Create Resources**:
   ```
   /analyze-image (POST)
   /search-by-ingredients (POST)
   ```

3. **Get API Endpoint**: `https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev`

### Step 5: Configure Your App

1. **Copy environment file**:
   ```bash
   cp .env.example .env.local
   ```

2. **Update `.env.local`** with your real credentials:
   ```env
   NEXT_PUBLIC_ENABLE_AUTH=true
   NEXT_PUBLIC_USER_POOL_ID=us-east-1_XXXXXXXXX
   NEXT_PUBLIC_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
   NEXT_PUBLIC_IDENTITY_POOL_ID=us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   NEXT_PUBLIC_AWS_REGION=us-east-1
   NEXT_PUBLIC_API_ENDPOINT=https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev
   ```

3. **Restart your development server**:
   ```bash
   npm run dev
   ```

## Alternative: Using AWS Amplify CLI

If you prefer to use the Amplify CLI (requires admin permissions):

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize your project
amplify init

# Add authentication
amplify add auth

# Add API
amplify add api

# Deploy your backend
amplify push
```

This will automatically generate the configuration files for you.

## Development vs Production

### Development Mode (Current)
- Authentication: **Disabled**
- API calls: **Mock data**
- Perfect for testing UI/UX

### Production Mode
- Authentication: **Enabled**
- API calls: **Real AWS services**
- Real user management

## Troubleshooting

### "Invalid user pool id provided"
- Make sure `NEXT_PUBLIC_ENABLE_AUTH=false` in `.env.local` for development
- Or provide real credentials and set `NEXT_PUBLIC_ENABLE_AUTH=true`

### CORS Issues
- Configure CORS in your API Gateway
- Allow origins: `http://localhost:3000` for development

### Permission Errors
- Ensure your Identity Pool has proper IAM roles
- Check CloudWatch logs for detailed error messages

## Cost Estimation

AWS services used:
- **Cognito**: Free tier covers up to 50,000 MAUs
- **API Gateway**: $3.50 per million API calls
- **Lambda**: Free tier covers 1M requests/month
- **S3**: Minimal cost for storing images

Expected monthly cost for small app: **$0-5**

## Security Best Practices

1. **Never commit credentials** to version control
2. **Use environment variables** for all sensitive data
3. **Enable MFA** for production users
4. **Set up proper IAM roles** with minimal permissions
5. **Use HTTPS** in production (handled by Vercel/Netlify)

## Next Steps

1. Test the app in development mode (auth disabled)
2. Set up AWS services when ready for production
3. Deploy to Vercel/Netlify with environment variables
4. Configure custom domain (optional)

Need help? Check the AWS documentation or create an issue in this repository!
