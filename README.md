# Recipe AI - Smart Recipe Recommendations

A modern, lightweight Next.js application that provides intelligent recipe recommendations based on user-selected ingredients or uploaded food images. **No authentication required** - just start cooking!

## Features

- **Ingredient-based Search**: Select from a list of common ingredients to find matching recipes
- **Image Analysis**: Upload food photos to automatically detect ingredients and suggest recipes (simulated with smart mock data)
- **Responsive Design**: Clean, minimalist interface that works on all devices
- **Real-time Results**: Fast recipe discovery with loading states and error handling
- **No Sign-up Required**: Jump straight into finding recipes without any barriers

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **No Backend Dependencies**: Runs entirely in the browser with smart mock data

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
