// Type definitions for API responses
export interface Recipe {
  recipe_id: number
  name: string
  ingredients: string // This comes as a string from the API, we'll parse it
  steps: string // This comes as a string from the API, we'll parse it
  image_url: string
}

// Processed recipe type for the frontend
export interface ProcessedRecipe {
  recipe_id: number
  name: string
  ingredients: string[]
  steps: string[]
  image_url: string
}

// API service functions
export class RecipeAPI {
  private static readonly API_NAME = 'recipeapi' // Replace with your API name

  /**
   * Fetch all available ingredients from the backend
   * This is a placeholder function - you'll need to create this endpoint
   */
  static async getIngredients(): Promise<string[]> {
    try {
      // For now, return a comprehensive list of ingredients
      // In the future, you can create a GET /ingredients endpoint
      return [
        'Tomato', 'Cheese', 'Bread', 'Chicken', 'Onion', 'Garlic', 'Olive Oil', 
        'Pasta', 'Rice', 'Bell Pepper', 'Eggs', 'Butter', 'Milk', 'Flour', 
        'Salt', 'Black Pepper', 'Basil', 'Oregano', 'Thyme', 'Rosemary',
        'Lemon', 'Lime', 'Avocado', 'Spinach', 'Lettuce', 'Cucumber', 'Carrot',
        'Potato', 'Sweet Potato', 'Broccoli', 'Cauliflower', 'Mushroom',
        'Beef', 'Pork', 'Fish', 'Salmon', 'Shrimp', 'Bacon', 'Ham',
        'Apple', 'Banana', 'Orange', 'Strawberry', 'Blueberry', 'Mango',
        'Coconut', 'Almond', 'Walnut', 'Peanut', 'Honey', 'Sugar', 'Vanilla'
      ]
    } catch (error) {
      console.error('Error fetching ingredients:', error)
      throw new Error('Failed to fetch ingredients')
    }
  }

  /**
   * Analyze image to extract ingredients (mock implementation)
   */
  static async analyzeImage(imageData: string): Promise<string[]> {
    try {
      // Mock image analysis - return common ingredients
      // In a real implementation, this would send to an AI service
      const mockIngredients = [
        'Tomato', 'Onion', 'Garlic', 'Bell Pepper', 'Cheese'
      ]
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return mockIngredients
    } catch (error) {
      console.error('Error analyzing image:', error)
      throw new Error('Failed to analyze image')
    }
  }

  /**
   * Search for recipes by ingredients
   */
  static async searchByIngredients(ingredients: string[]): Promise<ProcessedRecipe[]> {
    try {
      // Use mock data for demo purposes
      console.log('Searching recipes for ingredients:', ingredients)
      // Return mock recipes based on ingredients
      return this.getMockRecipesByIngredients(ingredients)
    } catch (error) {
      console.error('Error searching recipes:', error)
      throw new Error('Failed to search recipes')
    }
  }

  /**
   * Get mock recipes based on ingredients for demo purposes
   */
  private static getMockRecipesByIngredients(ingredients: string[]): ProcessedRecipe[] {
    const allMockRecipes = [
      {
        recipe_id: 1,
        name: "Spaghetti Aglio e Olio",
        ingredients: ["Pasta", "Garlic", "Olive Oil", "Black Pepper"],
        steps: ["Boil pasta", "Sauté garlic in olive oil", "Toss pasta with oil", "Season with pepper", "Serve immediately"],
        image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc638d517?w=400"
      },
      {
        recipe_id: 2,
        name: "Scrambled Eggs",
        ingredients: ["Eggs", "Butter", "Salt", "Black Pepper"],
        steps: ["Beat eggs", "Heat butter in pan", "Add eggs to pan", "Scramble gently", "Season and serve"],
        image_url: "https://images.unsplash.com/photo-1582169296194-c4146cdc2b95?w=400"
      },
      {
        recipe_id: 3,
        name: "Tomato Basil Salad",
        ingredients: ["Tomato", "Basil", "Olive Oil", "Salt"],
        steps: ["Slice tomatoes", "Chop basil", "Drizzle with olive oil", "Season with salt", "Let flavors meld"],
        image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400"
      },
      {
        recipe_id: 4,
        name: "Grilled Chicken Breast",
        ingredients: ["Chicken", "Olive Oil", "Salt", "Black Pepper", "Garlic"],
        steps: ["Season chicken", "Heat grill", "Cook 6-7 minutes per side", "Check internal temperature", "Rest before serving"],
        image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400"
      },
      {
        recipe_id: 5,
        name: "Rice Pilaf",
        ingredients: ["Rice", "Onion", "Butter", "Salt"],
        steps: ["Sauté onion in butter", "Add rice and toast", "Add water and salt", "Simmer covered", "Fluff with fork"],
        image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"
      }
    ]

    // Filter recipes that contain at least one of the selected ingredients
    const filteredRecipes = allMockRecipes.filter(recipe =>
      recipe.ingredients.some(ingredient =>
        ingredients.some(selected => 
          ingredient.toLowerCase().includes(selected.toLowerCase()) ||
          selected.toLowerCase().includes(ingredient.toLowerCase())
        )
      )
    )

    return filteredRecipes.length > 0 ? filteredRecipes : allMockRecipes.slice(0, 3)
  }

  /**
   * Get personalized recommendations (no authentication required)
   */
  static async getRecommendations(): Promise<ProcessedRecipe[]> {
    try {
      // Return mock recommendations without authentication
      return this.getMockRecommendations()
    } catch (error) {
      console.error('Error getting recommendations:', error)
      throw new Error('Failed to get personalized recommendations')
    }
  }

  /**
   * Get mock recommendations for demo purposes
   */
  private static getMockRecommendations(): ProcessedRecipe[] {
    return [
      {
        recipe_id: 1,
        name: "Quick Pasta Carbonara",
        ingredients: ["Pasta", "Eggs", "Cheese", "Bacon", "Black Pepper"],
        steps: ["Boil pasta", "Cook bacon", "Mix eggs and cheese", "Combine all ingredients", "Serve hot"],
        image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc638d517?w=400"
      },
      {
        recipe_id: 2,
        name: "Fresh Garden Salad",
        ingredients: ["Lettuce", "Tomato", "Cucumber", "Olive Oil", "Lemon"],
        steps: ["Wash vegetables", "Chop lettuce and tomato", "Slice cucumber", "Make dressing", "Toss and serve"],
        image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400"
      },
      {
        recipe_id: 3,
        name: "Chicken Stir Fry",
        ingredients: ["Chicken", "Bell Pepper", "Onion", "Garlic", "Rice"],
        steps: ["Cook rice", "Cut chicken and vegetables", "Heat oil in pan", "Stir fry ingredients", "Serve over rice"],
        image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400"
      }
    ]
  }

  /**
   * Process raw API recipes into frontend format
   */
  private static processRecipes(recipes: Recipe[]): ProcessedRecipe[] {
    return recipes.map(recipe => ({
      recipe_id: recipe.recipe_id,
      name: recipe.name,
      ingredients: this.parseStringArray(recipe.ingredients),
      steps: this.parseStringArray(recipe.steps),
      image_url: recipe.image_url
    }))
  }

  /**
   * Parse string arrays from the API (e.g., "['item1', 'item2']" -> ['item1', 'item2'])
   */
  private static parseStringArray(str: string): string[] {
    try {
      // Remove any extra quotes and parse as JSON
      const cleaned = str.replace(/'/g, '"')
      return JSON.parse(cleaned)
    } catch (error) {
      console.error('Error parsing string array:', str, error)
      // Fallback: split by comma if JSON parsing fails
      return str.split(',').map(item => item.trim().replace(/['"[\]]/g, ''))
    }
  }
}
