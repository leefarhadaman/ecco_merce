import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Category } from '../types'

const CategoryBar = () => {
  const categories: Category[] = [
    {
      name: 'Fashion',
      subcategories: [
        {
          name: 'Men',
          subcategories: [
            { name: 'Topwear' },
            { name: 'Footwear' },
            { name: 'Bottomwear' },
            { name: 'Accessories' }
          ]
        },
        {
          name: 'Women',
          subcategories: [
            { name: 'Topwear' },
            { name: 'Footwear' },
            { name: 'Dresses' },
            { name: 'Jewelry' }
          ]
        },
        {
          name: 'Kids',
          subcategories: [
            { name: 'Topwear' },
            { name: 'Footwear' },
            { name: 'School Uniforms' }
          ]
        },
        {
          name: 'Boys',
          subcategories: [
            { name: 'Topwear' },
            { name: 'Footwear' },
            { name: 'Sportswear' }
          ]
        },
        {
          name: 'Girls',
          subcategories: [
            { name: 'Topwear' },
            { name: 'Footwear' },
            { name: 'Dresses' }
          ]
        }
      ]
    },
    {
      name: 'Electronics',
      subcategories: [
        { name: 'Mobiles', subcategories: [{ name: 'Smartphones' }, { name: 'Accessories' }] },
        { name: 'Computers', subcategories: [{ name: 'Laptops' }, { name: 'Desktops' }] },
        { name: 'Accessories', subcategories: [{ name: 'Audio' }, { name: 'Chargers' }] }
      ]
    },
    {
      name: 'Home',
      subcategories: [
        { name: 'Appliances', subcategories: [{ name: 'Kitchen' }, { name: 'Laundry' }] },
        { name: 'Furniture', subcategories: [{ name: 'Living Room' }, { name: 'Bedroom' }] }
      ]
    },
    {
      name: 'Beauty',
      subcategories: [
        { name: 'Skincare', subcategories: [{ name: 'Moisturizers' }, { name: 'Cleansers' }] },
        { name: 'Makeup', subcategories: [{ name: 'Foundation' }, { name: 'Lipstick' }] }
      ]
    }
  ]

  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(null)

  return (
    <div className="bg-glass backdrop-blur-lg border-glass-border border rounded-lg mx-4 my-6 p-4 shadow-md">
      <div className="flex justify-around relative">
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative group"
            onMouseEnter={() => setHoveredCategory(category.name)}
            onMouseLeave={() => {
              setHoveredCategory(null)
              setHoveredSubCategory(null)
            }}
          >
            <Link
              to={`/category/${category.name.toLowerCase()}`}
              className="text-gray-800 hover:text-blue-600 font-semibold transition-colors"
            >
              {category.name}
            </Link>
            {hoveredCategory === category.name && category.subcategories && (
              <div className="absolute top-6 left-0 bg-glass backdrop-blur-lg border-glass-border border rounded-lg shadow-xl p-4 w-48 z-50">
                {category.subcategories.map((sub) => (
                  <div
                    key={sub.name}
                    className="relative group/sub"
                    onMouseEnter={() => setHoveredSubCategory(sub.name)}
                    onMouseLeave={() => setHoveredSubCategory(null)}
                  >
                    <Link
                      to={`/category/${category.name.toLowerCase()}/${sub.name.toLowerCase()}`}
                      className="block py-1 text-gray-800 hover:text-blue-600 transition-colors"
                    >
                      {sub.name}
                    </Link>
                    {hoveredSubCategory === sub.name && sub.subcategories && (
                      <div className="absolute left-full top-0 bg-glass backdrop-blur-lg border-glass-border border rounded-lg shadow-xl p-4 w-48">
                        {sub.subcategories.map((subSub) => (
                          <Link
                            key={subSub.name}
                            to={`/category/${category.name.toLowerCase()}/${sub.name.toLowerCase()}/${subSub.name.toLowerCase()}`}
                            className="block py-1 text-gray-800 hover:text-blue-600 transition-colors"
                          >
                            {subSub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryBar