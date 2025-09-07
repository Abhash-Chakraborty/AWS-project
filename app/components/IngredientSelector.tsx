'use client'

import { useState, useEffect } from 'react'
import { RecipeAPI } from '../../lib/api'

interface IngredientSelectorProps {
  onClose: () => void
  onIngredientsSelected: (ingredients: string[]) => void
}

export default function IngredientSelector({ onClose, onIngredientsSelected }: IngredientSelectorProps) {
  const [allIngredients, setAllIngredients] = useState<string[]>([])
  const [filteredIngredients, setFilteredIngredients] = useState<string[]>([])
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch ingredients when component mounts
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true)
        const ingredients = await RecipeAPI.getIngredients()
        setAllIngredients(ingredients)
        setFilteredIngredients(ingredients)
      } catch (err) {
        setError('Failed to load ingredients')
        console.error('Error fetching ingredients:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchIngredients()
  }, [])

  // Filter ingredients based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredIngredients(allIngredients)
    } else {
      const filtered = allIngredients.filter(ingredient =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredIngredients(filtered)
    }
  }, [searchTerm, allIngredients])

  // Handle ingredient checkbox change
  const handleIngredientChange = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(item => item !== ingredient)
        : [...prev, ingredient]
    )
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle form submission
  const handleGetRecipes = async () => {
    if (selectedIngredients.length === 0) {
      alert('Please select at least one ingredient.')
      return
    }
    
    try {
      onIngredientsSelected(selectedIngredients)
    } catch (error) {
      console.error('Error getting recipes:', error)
      alert('Failed to get recipes. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading ingredients...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Select Your Ingredients
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Search and select the ingredients you have available:
          </p>
          
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search ingredients..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Ingredients List */}
          <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
            {filteredIngredients.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No ingredients found matching "{searchTerm}"
              </p>
            ) : (
              filteredIngredients.map(ingredient => (
                <label
                  key={ingredient}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedIngredients.includes(ingredient)}
                    onChange={() => handleIngredientChange(ingredient)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{ingredient}</span>
                </label>
              ))
            )}
          </div>

          {/* Selected ingredients count */}
          {selectedIngredients.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">
                Selected: {selectedIngredients.length} ingredient{selectedIngredients.length !== 1 ? 's' : ''}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedIngredients.map(ingredient => (
                  <span
                    key={ingredient}
                    className="bg-blue-600 text-white text-xs px-2 py-1 rounded"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleGetRecipes}
            disabled={selectedIngredients.length === 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Get Recipes
          </button>
        </div>
      </div>
    </div>
  )
}
