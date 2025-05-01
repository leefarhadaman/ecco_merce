import { createContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { toast } from 'react-hot-toast';

interface CompareContextType {
  compareProducts: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;
}

export const CompareContext = createContext<CompareContextType>({
  compareProducts: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
  clearCompare: () => {},
});

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareProducts, setCompareProducts] = useState<Product[]>(
    JSON.parse(localStorage.getItem('compareProducts') || '[]')
  );

  useEffect(() => {
    localStorage.setItem('compareProducts', JSON.stringify(compareProducts));
  }, [compareProducts]);

  const addToCompare = (product: Product) => {
    if (compareProducts.some((p) => p.id === product.id)) {
      toast.error(`${product.name} is already in compare.`);
      return;
    }
    if (compareProducts.length >= 4) {
      toast.error('You can compare up to 4 products.');
      return;
    }
    setCompareProducts((prev) => [...prev, product]);
    toast.success(`${product.name} added to compare.`);
  };

  const removeFromCompare = (productId: number) => {
    setCompareProducts((prev) => prev.filter((p) => p.id !== productId));
    toast.success('Removed from compare.');
  };

  const clearCompare = () => {
    setCompareProducts([]);
    toast.success('Compare list cleared.');
  };

  return (
    <CompareContext.Provider value={{ compareProducts, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
};