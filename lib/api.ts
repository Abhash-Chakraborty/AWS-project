import { post } from 'aws-amplify/api'
import { getCurrentUser } from 'aws-amplify/auth'

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
   * Analyze image to extract ingredients
   */
  static async analyzeImage(imageData: string): Promise<string[]> {
    try {
      const response = await post({
        apiName: this.API_NAME,
        path: '/analyze-image',
        options: {
          body: {
            image_data: imageData
          }
        }
      }).response
      
      const result = await response.body.json()
      return result as string[]
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
      const response = await post({
        apiName: this.API_NAME,
        path: '/search-by-ingredients',
        options: {
          body: {
            ingredients
          }
        }
      }).response
      
      const result = await response.body.json()
      // Process the raw API response
      return this.processRecipes(result as unknown as Recipe[])
    } catch (error) {
      console.error('Error searching recipes:', error)
      throw new Error('Failed to search recipes')
    }
  }

  /**
   * Get personalized recommendations for the current user
   */
  static async getRecommendations(): Promise<ProcessedRecipe[]> {
    try {
      // Get the current authenticated user
      const user = await getCurrentUser()
      const userId = user.username // or user.userId for Cognito user ID
      
      const response = await post({
        apiName: this.API_NAME,
        path: '/recommendations',
        options: {
          body: {
            user_id: userId
          }
        }
      }).response
      
      const result = await response.body.json()
      // Process the raw API response
      return this.processRecipes(result as unknown as Recipe[])
    } catch (error) {
      console.error('Error getting recommendations:', error)
      throw new Error('Failed to get personalized recommendations')
    }
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
