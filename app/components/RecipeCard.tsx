'use client'

import { ProcessedRecipe } from '../../lib/api'

interface RecipeCardProps {
  recipe: ProcessedRecipe
  onViewRecipe: (recipe: ProcessedRecipe) => void
}

export default function RecipeCard({ recipe, onViewRecipe }: RecipeCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-orange-100 group hover:-translate-y-1">
      {/* Recipe Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
          {recipe.name}
        </h3>
        
        {/* Cooking time */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 text-sm rounded-full font-medium">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.minutes > 0 ? `${recipe.minutes} min` : 'Quick recipe'}
          </span>
        </div>
        
        {/* Quick ingredient preview */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
              <span
                key={index}
                className="bg-gray-100 hover:bg-orange-50 text-gray-700 text-xs px-3 py-1 rounded-full transition-colors duration-200 border border-gray-200"
              >
                {ingredient}
              </span>
            ))}
            {recipe.ingredients.length > 4 && (
              <span className="text-xs text-orange-600 px-3 py-1 font-medium">
                +{recipe.ingredients.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* View Recipe Button */}
        <button
          onClick={() => onViewRecipe(recipe)}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <span className="flex items-center justify-center space-x-2">
            <span>View Full Recipe</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}
