'use client'

import { useState } from 'react'
import { RecipeAPI, ProcessedRecipe } from '../../lib/api'
import { useAuth, LoginModal, UserProfile } from './UserAuth'
import IngredientSelector from './IngredientSelector'
import ImageUploader from './ImageUploader'
import RecipeCard from './RecipeCard'
import RecipeDisplay from './RecipeDisplay'

export default function RecipeGenerator() {
  const { user, login, logout, isAuthenticated } = useAuth()
  const [currentView, setCurrentView] = useState<'initial' | 'options' | 'results'>('initial')
  const [recipes, setRecipes] = useState<ProcessedRecipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showIngredientModal, setShowIngredientModal] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<ProcessedRecipe | null>(null)
  const [showRecipeModal, setShowRecipeModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Handle initial "Find Recipes by Ingredients" button click
  const handleFindRecipe = () => {
    setCurrentView('options')
  }

  // Handle "Surprise Me!" button click - get general recommendations
  const handleSurpriseMe = async () => {
    setLoading(true)
    setError(null)
    setCurrentView('results')

    try {
      const userId = isAuthenticated ? user?.id : undefined
      const recommendedRecipes = await RecipeAPI.getRecommendations(userId)
      setRecipes(recommendedRecipes)
    } catch (err) {
      setError('Failed to get recipe recommendations. Please try again.')
      console.error('Error getting recommendations:', err)
    } finally {
      setLoading(false)
    }
  }

  // Handle ingredient selection from modal
  const handleIngredientsSelected = async (ingredients: string[]) => {
    setShowIngredientModal(false)
    setLoading(true)
    setError(null)
    setCurrentView('results')

    try {
      const recipeResults = await RecipeAPI.searchByIngredients(ingredients)
      setRecipes(recipeResults)
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.')
      console.error('Error fetching recipes:', err)
    } finally {
      setLoading(false)
    }
  }

  // Handle image analysis - automatically search for recipes with detected ingredients
  const handleImageAnalyzed = async (ingredients: string[]) => {
    setLoading(true)
    setError(null)
    setCurrentView('results')

    try {
      // Automatically search for recipes using the detected ingredients
      const recipeResults = await RecipeAPI.searchByIngredients(ingredients)
      setRecipes(recipeResults)
    } catch (err) {
      setError('Failed to fetch recipes based on image analysis. Please try again.')
      console.error('Error fetching recipes from image analysis:', err)
    } finally {
      setLoading(false)
    }
  }

  // Handle recipe card click
  const handleRecipeClick = (recipe: ProcessedRecipe) => {
    setSelectedRecipe(recipe)
    setShowRecipeModal(true)
  }

  // Reset to initial state
  const handleSearchAgain = () => {
    setCurrentView('initial')
    setRecipes([])
    setError(null)
    setSelectedRecipe(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* User Authentication Bar */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Recipe AI</h1>
        <div>
          {isAuthenticated ? (
            <UserProfile user={user!} onLogout={logout} />
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Initial State */}
      {currentView === 'initial' && (
        <div className="text-center space-y-4">
          <button
            onClick={handleFindRecipe}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-12 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Find Recipes by Ingredients
          </button>
          
          <div className="text-gray-600 text-sm">or</div>
          
          <button
            onClick={handleSurpriseMe}
            className="bg-green-600 hover:bg-green-700 text-white text-lg font-medium px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Surprise Me! 🎲
          </button>
          <p className="text-gray-500 text-sm mt-2">
            Get recipe recommendations or search by your ingredients
          </p>
        </div>
      )}

      {/* Options State */}
      {currentView === 'options' && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <button
              onClick={() => setShowIngredientModal(true)}
              className="bg-gray-800 hover:bg-gray-700 text-white text-lg font-medium px-8 py-4 rounded-lg transition-colors duration-200 w-full"
            >
              Select My Ingredients
            </button>
          </div>
          <div>
            <ImageUploader onImageAnalyzed={handleImageAnalyzed} />
          </div>
        </div>
      )}

      {/* Results State */}
      {currentView === 'results' && (
        <div>
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Finding delicious recipes...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={handleSearchAgain}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && recipes.length > 0 && (
            <div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {recipes.map(recipe => (
                  <RecipeCard
                    key={recipe.recipe_id}
                    recipe={recipe}
                    onViewRecipe={handleRecipeClick}
                  />
                ))}
              </div>
              
              <div className="text-center">
                <button
                  onClick={handleSearchAgain}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Search Again
                </button>
              </div>
            </div>
          )}

          {!loading && !error && recipes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No recipes found. Try different ingredients or options.</p>
              <button
                onClick={handleSearchAgain}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Search Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {showIngredientModal && (
        <IngredientSelector
          onClose={() => setShowIngredientModal(false)}
          onIngredientsSelected={handleIngredientsSelected}
        />
      )}

      {showRecipeModal && selectedRecipe && (
        <RecipeDisplay
          recipe={selectedRecipe}
          onClose={() => setShowRecipeModal(false)}
        />
      )}

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={login}
        />
      )}
    </div>
  )
}
