'use client'

import { ProcessedRecipe } from '../../lib/api'

interface RecipeCardProps {
  recipe: ProcessedRecipe
  onViewRecipe: (recipe: ProcessedRecipe) => void
}

export default function RecipeCard({ recipe, onViewRecipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Recipe Image */}
      <div className="aspect-video bg-gray-200 flex items-center justify-center">
        <img
          src={recipe.image_url}
          alt={recipe.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/300x200/E5E7EB/6B7280?text=Recipe+Image'
          }}
        />
      </div>

      {/* Recipe Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {recipe.name}
        </h3>
        
        {/* Quick ingredient preview */}
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-1">Ingredients:</p>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {ingredient}
              </span>
            ))}
            {recipe.ingredients.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{recipe.ingredients.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* View Recipe Button */}
        <button
          onClick={() => onViewRecipe(recipe)}
          className="w-full bg-accent hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          View Recipe
        </button>
      </div>
    </div>
  )
}
