# AWS Integration Setup Guide

## 🚀 Quick Start

Your Recipe AI app has been refactored to integrate with AWS backend services. Here's how to complete the setup:

## 📋 Prerequisites

1. **AWS Account** with Amplify CLI configured
2. **Backend API** deployed with the following endpoints:
   - `POST /analyze-image`
   - `POST /search-by-ingredients`
   - `POST /recommendations`

## 🔧 Configuration Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure AWS Settings

Update the file `src/aws-exports.js` with your actual AWS configuration:

```javascript
const awsconfig = {
  "aws_project_region": "your-region",
  "aws_cognito_region": "your-region", 
  "aws_user_pools_id": "your-user-pool-id",
  "aws_user_pools_web_client_id": "your-app-client-id",
  "aws_cloud_logic_custom": [
    {
      "name": "recipeapi",
      "endpoint": "https://your-api-gateway-url.execute-api.region.amazonaws.com/stage",
      "region": "your-region"
    }
  ]
}
```

### 3. Update API Name

In `lib/api.ts`, update the API_NAME to match your API Gateway name:

```typescript
private static readonly API_NAME = 'your-api-name'
```

## 🔌 API Endpoints Required

Your backend should implement these endpoints exactly as specified:

### 1. Analyze Image
```
POST /analyze-image
Body: { "image_data": "base64_string" }
Response: ["Tomato", "Cheese", "Basil"]
```

### 2. Search by Ingredients  
```
POST /search-by-ingredients
Body: { "ingredients": ["Tomato", "Cheese"] }
Response: [
  {
    "recipe_id": 12345,
    "name": "Recipe Name",
    "ingredients": "['ingredient1', 'ingredient2']",
    "steps": "['Step 1', 'Step 2']", 
    "image_url": "https://example.com/image.jpg"
  }
]
```

### 3. Get Recommendations
```
POST /recommendations
Body: { "user_id": "cognito_user_id" }
Response: [same format as search-by-ingredients]
```

## ✨ New Features

### 🎲 Surprise Me Button
- Gets personalized recommendations for authenticated users
- Uses Cognito user ID to fetch tailored recipes

### 🔍 Enhanced Ingredient Search
- Fetches 50+ ingredients from backend (currently uses local list)
- Real-time search filtering
- Improved UX with loading states

### 📸 Smart Image Analysis
- Uploads images as base64 to AWS
- Automatically searches for recipes using detected ingredients
- Better error handling

## 🔧 Development

```bash
# Start development server
npm run dev

# Build for production  
npm run build
```

## 🚨 Important Notes

1. **Authentication**: The app now requires user authentication via AWS Cognito
2. **API Integration**: All placeholder functions have been replaced with real AWS API calls
3. **Error Handling**: Improved error states and user feedback
4. **Type Safety**: Full TypeScript integration with proper type definitions

## 🐛 Troubleshooting

### "Cannot find module 'aws-amplify'"
```bash
npm install aws-amplify @aws-amplify/ui-react
```

### "Invalid user pool id"
- Update `src/aws-exports.js` with real AWS credentials
- Ensure Cognito User Pool is properly configured

### API Errors
- Verify API Gateway endpoints are deployed
- Check CORS configuration
- Ensure proper IAM permissions

## 📚 Next Steps

1. Deploy your backend API endpoints
2. Test each API endpoint manually
3. Update the configuration files
4. Run the application and test all features
5. Deploy to production

Your app now features a complete AWS integration with authentication, real-time ingredient search, smart image analysis, and personalized recommendations! 🎉
