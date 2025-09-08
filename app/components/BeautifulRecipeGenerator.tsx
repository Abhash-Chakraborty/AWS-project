'use client'

import { useState } from 'react'
import { RecipeAPI, ProcessedRecipe } from '../../lib/api'
import IngredientSelector from './IngredientSelector'
import ImageUploader from './ImageUploader'
import RecipeCard from './RecipeCard'
import RecipeDisplay from './RecipeDisplay'

export default function BeautifulRecipeGenerator() {
  const [currentView, setCurrentView] = useState<'initial' | 'options' | 'results'>('initial')
  const [recipes, setRecipes] = useState<ProcessedRecipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showIngredientModal, setShowIngredientModal] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<ProcessedRecipe | null>(null)
  const [showRecipeModal, setShowRecipeModal] = useState(false)

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
      // No authentication needed - get general recommendations
      const recommendedRecipes = await RecipeAPI.getRecommendations()
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-200 to-red-200 rounded-full opacity-20 animate-pulse animation-delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation Header */}
        <nav className="bg-white/80 backdrop-blur-lg border-b border-orange-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">🍳</span>
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Recipe AI
                  </h1>
                </div>
                {currentView !== 'initial' && (
                  <button
                    onClick={handleSearchAgain}
                    className="text-gray-600 hover:text-orange-600 transition-colors duration-200"
                  >
                    ← Back to Home
                  </button>
                )}
              </div>
              <div>
                {/* Authentication removed - app is now open access */}
                <div className="text-orange-600 font-medium">
                  Welcome! No sign-in required
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Initial State - Hero Section */}
          {currentView === 'initial' && (
            <div className="text-center space-y-8 py-12">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent leading-tight">
                  Discover Amazing Recipes
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Transform your ingredients into delicious meals with the power of AI. 
                  Upload a photo or select ingredients to get started.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleFindRecipe}
                  className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xl font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 min-w-64"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>🥘</span>
                    <span>Find Recipes by Ingredients</span>
                  </span>
                </button>
                
                <div className="text-gray-400 font-medium">or</div>
                
                <button
                  onClick={handleSurpriseMe}
                  className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-lg font-medium px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-48"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span className="animate-bounce">🎲</span>
                    <span>Surprise Me!</span>
                  </span>
                </button>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
                  <div className="text-3xl mb-3">📸</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Upload Photos</h3>
                  <p className="text-gray-600 text-sm">Take a photo of your ingredients and let AI identify them for you</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
                  <div className="text-3xl mb-3">🧄</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Select Ingredients</h3>
                  <p className="text-gray-600 text-sm">Choose from our extensive database of ingredients</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
                  <div className="text-3xl mb-3">✨</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Get Recipes</h3>
                  <p className="text-gray-600 text-sm">Receive personalized recipe recommendations instantly</p>
                </div>
              </div>
            </div>
          )}

          {/* Options State */}
          {currentView === 'options' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">How would you like to search?</h2>
                <p className="text-gray-600">Choose your preferred method to find amazing recipes</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-orange-100">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🧄</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Select Ingredients</h3>
                    <p className="text-gray-600 mb-6">Choose from our curated list of ingredients</p>
                    <button
                      onClick={() => setShowIngredientModal(true)}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Select My Ingredients
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-orange-100">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">📸</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Upload Photo</h3>
                    <p className="text-gray-600 mb-6">Let AI analyze your ingredients from a photo</p>
                  </div>
                  <ImageUploader onImageAnalyzed={handleImageAnalyzed} />
                </div>
              </div>
            </div>
          )}

          {/* Results State */}
          {currentView === 'results' && (
            <div className="space-y-6">
              {loading && (
                <div className="text-center py-16">
                  <div className="inline-flex items-center space-x-3">
                    <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                    <span className="text-lg text-gray-600 font-medium">Finding delicious recipes for you...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
                    <div className="text-red-500 text-4xl mb-3">⚠️</div>
                    <p className="text-red-600 font-medium mb-4">{error}</p>
                    <button
                      onClick={handleSearchAgain}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {!loading && !error && recipes.length > 0 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      Found {recipes.length} Amazing Recipe{recipes.length !== 1 ? 's' : ''}
                    </h2>
                    <p className="text-gray-600">Click on any recipe to see the full details</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map(recipe => (
                      <RecipeCard
                        key={recipe.recipe_id}
                        recipe={recipe}
                        onViewRecipe={handleRecipeClick}
                      />
                    ))}
                  </div>
                </div>
              )}

              {!loading && !error && recipes.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🤔</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No recipes found</h3>
                  <p className="text-gray-600 mb-6">Try different ingredients or search options</p>
                  <button
                    onClick={handleSearchAgain}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Search Again
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

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
    </div>
  )
}
