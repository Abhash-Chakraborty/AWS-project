import { post } from 'aws-amplify/api';

// Processed recipe type for the frontend, matching the backend response
export interface ProcessedRecipe {
  recipe_id: number
  name: string
  ingredients: string[]
  steps: string[]
  minutes: number
}

// API service functions
export class RecipeAPI {
  private static readonly API_NAME = 'recipeapi' // This must match the name in ConfigureAmplify.tsx

  /**
   * Fetch all available ingredients from the backend.
   * This will extract ingredients from the recipe database.
   */
  static async getIngredients(): Promise<string[]> {
    try {
      // Try to get a sample of recipes to extract ingredients from
      const sampleRecipes = await this.searchByIngredients(['chicken', 'rice', 'tomato', 'onion']);
      
      // Extract all unique ingredients from the recipes
      const allIngredients = new Set<string>();
      
      sampleRecipes.forEach(recipe => {
        if (Array.isArray(recipe.ingredients)) {
          recipe.ingredients.forEach(ingredient => {
            // Clean up the ingredient name
            const cleanIngredient = ingredient
              .toLowerCase()
              .replace(/['"]/g, '') // Remove quotes
              .replace(/\s+/g, ' ') // Normalize whitespace
              .trim()
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
              .join(' ');
            
            if (cleanIngredient.length > 1) {
              allIngredients.add(cleanIngredient);
            }
          });
        }
      });

      // Convert to array and sort alphabetically
      const ingredientList = Array.from(allIngredients).sort();
      
      // If we got some ingredients, return them, otherwise fallback
      if (ingredientList.length > 10) {
        return ingredientList;
      } else {
        throw new Error('Not enough ingredients found');
      }
    } catch (error) {
      console.error('Error fetching ingredients:', error)
      // Fallback to static list if API fails
      return [
        'Chicken', 'Rice', 'Onion', 'Garlic'
      ]
    }
  }

  /**
   * Analyze an image to extract ingredients by calling the /analyze-image endpoint.
   * @param base64Image - The base64-encoded image data.
   */
  static async analyzeImage(base64Image: string): Promise<string[]> {
    try {
      const restOperation = post({
        apiName: this.API_NAME,
        path: '/analyze-image',
        options: {
          body: {
            image_data: base64Image,
          },
        },
      });

      const { body } = await restOperation.response;
      const response = await body.json();

      return response as unknown as string[];
    } catch (error) {
      console.error('Error analyzing image:', error)
      throw new Error('Failed to analyze image')
    }
  }

  /**
   * Search for recipes by ingredients by calling the /search-by-ingredients endpoint.
   * @param ingredients - An array of ingredients to search for.
   */
  static async searchByIngredients(ingredients: string[]): Promise<ProcessedRecipe[]> {
    try {
      const restOperation = post({
        apiName: this.API_NAME,
        path: '/search-by-ingredients',
        options: {
          body: {
            ingredients: ingredients,
          },
        },
      });

      const { body } = await restOperation.response;
      const response = await body.json();

      // Transform the backend response to match our interface
      const recipes = response as any[];
      return recipes.map(recipe => ({
        recipe_id: recipe.recipe_id,
        name: recipe.name,
        ingredients: typeof recipe.ingredients === 'string' 
          ? JSON.parse(recipe.ingredients) 
          : recipe.ingredients,
        steps: typeof recipe.steps === 'string' 
          ? JSON.parse(recipe.steps) 
          : recipe.steps,
        minutes: recipe.minutes || 0
      }));
    } catch (error) {
      console.error('Error searching recipes:', error)
      throw new Error('Failed to search recipes')
    }
  }

  /**
   * Get general recipe recommendations from the /recommendations endpoint.
   * @param userId - Optional user ID for personalized recommendations
   */
  static async getRecommendations(userId?: string): Promise<ProcessedRecipe[]> {
    try {
      const restOperation = post({
        apiName: this.API_NAME,
        path: '/recommendations',
        options: {
          body: {
            user_id: userId || 'guest',
            preferences: {
              cuisine: 'general',
              dietary: 'none'
            }
          },
        },
      });

      const { body } = await restOperation.response;
      const response = await body.json();

      // Transform the backend response to match our interface
      const recipes = response as any[];
      return recipes.map(recipe => ({
        recipe_id: recipe.recipe_id,
        name: recipe.name,
        ingredients: typeof recipe.ingredients === 'string' 
          ? JSON.parse(recipe.ingredients) 
          : recipe.ingredients,
        steps: typeof recipe.steps === 'string' 
          ? JSON.parse(recipe.steps) 
          : recipe.steps,
        minutes: recipe.minutes || 0
      }));
    } catch (error) {
      console.error('Error getting recommendations:', error)
      // Fallback to searching with common ingredients
      return this.searchByIngredients(['chicken', 'rice', 'onion']);
    }
  }
}
