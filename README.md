# Recipe AI - Smart Recipe Recommendations

A modern Next.js application that provides intelligent recipe recommendations with secure AWS Cognito authentication and real API integration.

## ✨ Features

- **🔐 Secure Authentication**: AWS Cognito integration with beautiful custom UI
- **🥘 Ingredient-based Search**: Find recipes by selecting ingredients
- **📸 Image Analysis**: Upload food photos to detect ingredients (AWS Rekognition)
- **🎨 Beautiful Design**: Modern gradients, glassmorphism effects, and responsive layout
- **⚡ Real-time Results**: Fast API responses with loading states
- **☁️ AWS Powered**: Full backend integration with AWS services

## 🚀 Quick Setup

1. **Clone and Install**:
   ```bash
   git clone <your-repo>
   cd Recipe-AI
   npm install
   ```

2. **AWS Setup**: Follow the [**SIMPLE_AWS_SETUP.md**](SIMPLE_AWS_SETUP.md) guide (takes 5 minutes)

3. **Run the App**:
   ```bash
   npm run dev
   ```

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Authentication**: AWS Cognito with Amplify UI
- **Backend**: AWS API Gateway + Lambda functions
- **Database**: Amazon DynamoDB
- **AI**: Amazon Rekognition for image analysis
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom gradients

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd recipe-ai
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser and start discovering recipes!

## Project Structure

```
/app
  /components
    Auth.tsx              # Simple wrapper component (no authentication)
    RecipeGenerator.tsx   # Main application logic and state management
    IngredientSelector.tsx # Modal for selecting ingredients
    ImageUploader.tsx     # Drag-and-drop image upload component
    RecipeCard.tsx        # Individual recipe display cards
    RecipeDisplay.tsx     # Full recipe details modal
  layout.tsx              # Root layout with global styles
  page.tsx                # Main entry point
  globals.css             # Global CSS with Tailwind
```

## How It Works

### Recipe Discovery Flow
1. **Start**: Click "Find a Recipe" to begin
2. **Choose Method**: 
   - Select ingredients from a predefined list, OR
   - Upload a food image for automatic ingredient detection
3. **Get Results**: See a curated list of recipes based on your selection
4. **View Details**: Click any recipe card to see full ingredients and step-by-step instructions

### Smart Mock Data
The app includes an intelligent recipe database with:
- **6 diverse recipes** covering different cuisines and difficulty levels
- **Ingredient matching algorithm** that finds recipes based on what you have
- **Realistic image analysis simulation** that suggests relevant ingredients
- **Responsive recipe filtering** that adapts to your selections

## Sample Recipes Included

- **Classic Margherita Pizza** - Italian classic with fresh ingredients
- **Grilled Cheese Sandwich** - Comfort food favorite
- **Fresh Caprese Salad** - Light and refreshing
- **Chicken Fried Rice** - Asian-inspired one-pan meal
- **Garlic Pasta** - Simple but delicious Italian
- **Classic Omelette** - Perfect breakfast option

## Customization

### Adding More Recipes
Edit the `allRecipes` array in `/app/components/RecipeGenerator.tsx`:

```typescript
const allRecipes = [
  {
    recipe_id: 7,
    name: 'Your Recipe Name',
    ingredients: ['ingredient1', 'ingredient2'],
    steps: ['Step 1', 'Step 2'],
    image_url: 'https://your-image-url.com/image.jpg'
  },
  // ... more recipes
]
```

### Ingredient List
Modify the `AVAILABLE_INGREDIENTS` array in `/app/components/IngredientSelector.tsx`:

```typescript
const AVAILABLE_INGREDIENTS = [
  'Your Ingredient', 'Another Ingredient'
  // ... more ingredients
]
```

### Colors & Styling
The app uses a minimalist color scheme defined in `tailwind.config.js`. The primary accent color is blue (`#3B82F6`), which can be changed by modifying the `accent` color in the config.

## Future Enhancements

This app is designed to be easily extensible. Potential additions:

- **Real API Integration**: Connect to actual recipe APIs or databases
- **User Favorites**: Local storage for favorite recipes
- **Shopping Lists**: Generate ingredient shopping lists
- **Nutritional Info**: Add calorie and nutrition data
- **Social Features**: Share recipes with friends
- **Advanced Filtering**: Filter by cuisine, diet, cooking time, etc.

## Deployment

### Deploy to Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel via GitHub or CLI
```

### Deploy to Netlify
```bash
npm run build
# Deploy the `/out` folder to Netlify
```

The app has no backend dependencies, so it can be deployed anywhere that supports static sites!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your improvements (new recipes, features, etc.)
4. Submit a pull request

## License

This project is licensed under the MIT License - feel free to use it for your own projects!
