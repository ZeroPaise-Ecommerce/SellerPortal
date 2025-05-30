
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import POSLayout from '@/components/pos/POSLayout';
import ProductGrid, { Product } from '@/components/pos/ProductGrid';
import Cart, { CartItem } from '@/components/pos/Cart';

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Basic White T-Shirt",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "T-shirts",
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Bottoms",
  },
  {
    id: 3,
    name: "Classic Hoodie",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Hoodies",
  },
  {
    id: 4,
    name: "Summer Dress",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Dresses",
  },
  {
    id: 5,
    name: "Winter Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Outerwear",
  },
  {
    id: 6,
    name: "Wool Beanie",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Accessories",
  },
  {
    id: 7,
    name: "Leather Sneakers",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Shoes",
  },
  {
    id: 8,
    name: "Graphic T-Shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "T-shirts",
  },
  {
    id: 9,
    name: "Striped Polo Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "T-shirts",
  },
  {
    id: 10,
    name: "Denim Jacket",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Outerwear",
  },
  {
    id: 11,
    name: "Summer Shorts",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Bottoms",
  },
  {
    id: 12,
    name: "Baseball Cap",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Accessories",
  }
];

// Extract unique categories
const categories = Array.from(new Set(sampleProducts.map(p => p.category)));

const StorePOS = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Add product to cart
  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity of existing item
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item with quantity of 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart.`,
      duration: 2000,
    });
  };
  
  // Update item quantity in cart
  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  // Remove item from cart
  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  // Clear all items from cart
  const handleClearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      duration: 2000,
    });
  };
  
  // Handle checkout
  const handleCheckout = () => {
    // In a real app, this would submit the order to the backend
    toast({
      title: "Order placed successfully!",
      description: `Total: $${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`,
      duration: 3000,
    });
    setCartItems([]);
  };

  // Calculate total items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <POSLayout 
      totalItems={totalItems}
      cart={
        <Cart 
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
          onClearCart={handleClearCart}
        />
      }
    >
      <ProductGrid 
        products={sampleProducts}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        onAddToCart={handleAddToCart}
      />
    </POSLayout>
  );
};

export default StorePOS;
