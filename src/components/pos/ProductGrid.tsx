
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductGridProps {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ 
  products, 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  onAddToCart 
}: ProductGridProps) => {
  // Filter products by selected category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="p-4">
      {/* Categories */}
      <div className="mb-4 overflow-x-auto pb-2">
        <div className="flex space-x-2 min-w-max">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            onClick={() => onCategorySelect('All')}
            className="whitespace-nowrap"
            size="sm"
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => onCategorySelect(category)}
              className="whitespace-nowrap"
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredProducts.map(product => (
          <Card 
            key={product.id} 
            className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
            onClick={() => onAddToCart(product)}
          >
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm truncate">{product.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold text-sm">
                  ${product.price.toFixed(2)}
                </span>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
