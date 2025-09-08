'use client'

import { ProcessedRecipe } from '../../lib/api'

interface RecipeDisplayProps {
  recipe: ProcessedRecipe
  onClose: () => void
}

export default function RecipeDisplay({ recipe, onClose }: RecipeDisplayProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {recipe.name}
            </h2>
            {recipe.minutes > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                ⏱️ Cooking time: {recipe.minutes} minutes
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Ingredients Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Ingredients
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2"
                >
                  <span className="text-accent font-medium min-w-[20px]">
                    •
                  </span>
                  <span className="text-gray-700">
                    {ingredient}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Instructions
            </h3>
            <ol className="space-y-4">
              {recipe.steps.map((step, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3"
                >
                  <span className="bg-accent text-white text-sm font-medium min-w-[28px] h-7 rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
