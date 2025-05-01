import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const CategorySidebar = () => {
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
            { name: 'Accessories' },
          ],
        },
        {
          name: 'Women',
          subcategories: [
            { name: 'Topwear' },
            { name: 'Footwear' },
            { name: 'Dresses' },
            { name: 'Jewelry' },
            { name: 'Bottomwear' },
          ],
        },
        {
          name: 'Kids',
          subcategories: [
            { name: 'Topwear' },
            { name: 'Footwear' },
            { name: 'Accessories' },
          ],
        },
      ],
    },
    {
      name: 'Electronics',
      subcategories: [
        { name: 'Mobiles', subcategories: [{ name: 'Smartphones' }, { name: 'Tablets' }] },
        { name: 'Computers', subcategories: [{ name: 'Laptops' }, { name: 'Monitors' }] },
        { name: 'Accessories', subcategories: [{ name: 'Audio' }, { name: 'Wearables' }] },
      ],
    },
    {
      name: 'Home',
      subcategories: [
        { name: 'Appliances', subcategories: [{ name: 'Kitchen' }] },
        { name: 'Furniture', subcategories: [{ name: 'Living Room' }, { name: 'Bedroom' }] },
      ],
    },
    {
      name: 'Beauty',
      subcategories: [
        { name: 'Skincare', subcategories: [{ name: 'Moisturizers' }, { name: 'Cleansers' }] },
        { name: 'Makeup', subcategories: [{ name: 'Lipstick' }, { name: 'Foundation' }] },
      ],
    },
  ];

  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubCategory, setOpenSubCategory] = useState<string | null>(null);

  const toggleCategory = (name: string) => {
    setOpenCategory(openCategory === name ? null : name);
    setOpenSubCategory(null);
  };

  const toggleSubCategory = (name: string) => {
    setOpenSubCategory(openSubCategory === name ? null : name);
  };

  return (
    <aside className="hidden lg:block w-72 bg-ivory-100 p-6 shadow-2xl sticky top-20 border-r border-gold-300">
      <h2 className="text-2xl font-bold text-charcoal-900 mb-6 font-playfair">Explore Categories</h2>
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.name}>
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full text-left text-charcoal-900 font-semibold flex justify-between items-center py-3 hover:text-gold-500 transition-colors duration-300 font-montserrat"
            >
              {category.name}
              {openCategory === category.name ? (
                <ChevronDownIcon className="w-5 h-5 text-gold-500" />
              ) : (
                <ChevronRightIcon className="w-5 h-5 text-charcoal-600" />
              )}
            </button>
            {openCategory === category.name && category.subcategories && (
              <div className="pl-4 space-y-2 animate-slide-down">
                {category.subcategories.map((sub) => (
                  <div key={sub.name}>
                    <button
                      onClick={() => toggleSubCategory(sub.name)}
                      className="w-full text-left text-charcoal-800 flex justify-between items-center py-2 hover:text-gold-500 transition-colors duration-300 font-montserrat"
                    >
                      {sub.name}
                      {sub.subcategories && (
                        openSubCategory === sub.name ? (
                          <ChevronDownIcon className="w-4 h-4 text-gold-500" />
                        ) : (
                          <ChevronRightIcon className="w-4 h-4 text-charcoal-600" />
                        )
                      )}
                    </button>
                    {openSubCategory === sub.name && sub.subcategories && (
                      <div className="pl-4 space-y-1 animate-slide-down">
                        {sub.subcategories.map((subSub) => (
                          <Link
                            key={subSub.name}
                            to={`/category/${category.name.toLowerCase()}/${sub.name.toLowerCase()}/${subSub.name.toLowerCase()}`}
                            className="block text-charcoal-700 py-1 hover:text-gold-500 transition-colors duration-300 font-montserrat"
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
    </aside>
  );
};

export default CategorySidebar;