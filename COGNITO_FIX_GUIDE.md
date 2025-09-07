# Fixing Cognito Client Secret Error

## The Problem
Your Cognito App Client `5h4iccfj30ogpmkc1ij14kensg` is configured with a client secret, but web applications should NOT use client secrets for security reasons.

## Quick Fix Steps

### Step 1: Create New App Client (Recommended)

1. **Go to AWS Cognito Console**:
   ```
   https://console.aws.amazon.com/cognito/v2/home?region=ap-south-1
   ```

2. **Navigate to Your User Pool**:
   - Click on User Pool: `ap-south-1_mmTmYmefn`

3. **Create New App Client**:
   - Go to "App integration" tab
   - Scroll down to "App clients and analytics"
   - Click "Create app client"

4. **Configure New App Client**:
   ```
   App client name: recipe-ai-web-client
   App client type: Public client
   
   Authentication flows:
   ✅ ALLOW_USER_PASSWORD_AUTH
   ✅ ALLOW_USER_SRP_AUTH  
   ✅ ALLOW_REFRESH_TOKEN_AUTH
   ❌ ALLOW_ADMIN_USER_PASSWORD_AUTH (optional)
   
   ⚠️  IMPORTANT: Generate client secret = NO (unchecked)
   
   Token expiration:
   - Access token: 60 minutes (default)
   - ID token: 60 minutes (default)  
   - Refresh token: 30 days (default)
   
   Read and write attributes:
   ✅ email
   ✅ email_verified
   ✅ name (optional)
   ```

5. **Get New Client ID**:
   - After creating, copy the new App client ID
   - It will look like: `abcdef1234567890`

### Step 2: Update Your Environment Variables

Replace your client ID in `.env.local`:

```env
# Change this line:
NEXT_PUBLIC_USER_POOL_CLIENT_ID=5h4iccfj30ogpmkc1ij14kensg

# To your new client ID:
NEXT_PUBLIC_USER_POOL_CLIENT_ID=your_new_client_id_here
```

### Step 3: Enable Authentication

```env
# Change this back to true when ready:
NEXT_PUBLIC_ENABLE_AUTH=true
```

## Alternative: Use Amplify CLI (If Working)

If you can get Amplify CLI working, you can also fix this:

```bash
# Configure Amplify
amplify configure

# Update auth configuration
amplify update auth

# When prompted, choose:
# - Do you want to use the default authentication and security configuration? Manual configuration
# - How do you want users to be able to sign in? Username
# - Do you want to configure advanced settings? Yes
# - What attributes are required for signing up? Email
# - Do you want to enable any of the following capabilities? (none)
# - Do you want to use an OAuth flow? No

# Push changes
amplify push
```

## Testing the Fix

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Set Auth to True**:
   ```env
   NEXT_PUBLIC_ENABLE_AUTH=true
   ```

3. **Test Registration**:
   - Go to http://localhost:3000
   - Try creating a new account
   - You should see the Amplify UI sign-up form

4. **If Still Getting Errors**:
   - Double-check the new client ID
   - Ensure client secret is disabled
   - Check AWS CloudWatch logs for detailed errors

## Why This Happens

- **Client Secrets** are meant for server-side applications
- **Web applications** run in browsers where secrets can't be kept secure
- **Amplify UI React** doesn't support client secrets by design
- **Best Practice**: Use public clients for web apps

## Current App Status

I've temporarily disabled authentication (`NEXT_PUBLIC_ENABLE_AUTH=false`) so you can:
1. Test the Recipe AI app functionality
2. Fix the Cognito configuration
3. Re-enable authentication when ready

## Need Help?

If you're still having issues:
1. Share the exact error message
2. Confirm you created a new app client without secret
3. Double-check the client ID in `.env.local`

The app will work perfectly once this is fixed! 🚀
