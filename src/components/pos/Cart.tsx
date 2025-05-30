
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash, Plus, Minus, CreditCard, ShoppingCart } from 'lucide-react';
import { Product } from './ProductGrid';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
  onClearCart: () => void;
}

const Cart = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  onClearCart
}: CartProps) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-bold">Shopping Cart</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-gray-100 p-4 rounded-full mb-3">
            <ShoppingCart className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
          <p className="text-gray-500 text-sm mb-4">
            Add products from the store to start a new sale
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-bold">Cart ({items.length})</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearCart}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs"
        >
          Clear All
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {/* Cart Items */}
        <div className="divide-y">
          {items.map((item) => (
            <div key={item.id} className="p-3 flex">
              <div className="h-16 w-16 rounded bg-gray-100 overflow-hidden mr-3 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">${item.price.toFixed(2)}</span>
                  <div className="flex items-center space-x-1">
                    <Button 
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button 
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-400 hover:text-red-500 -mt-1 h-8 w-8"
                onClick={() => onRemoveItem(item.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Checkout Section */}
      <div className="border-t p-4 bg-gray-50">
        {/* Customer Selection */}
        <div className="mb-4">
          <label className="text-xs font-medium mb-1 block">Customer</label>
          <Select defaultValue="guest">
            <SelectTrigger className="w-full h-9 text-sm">
              <SelectValue placeholder="Select customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="guest">Guest Customer</SelectItem>
              <SelectItem value="john">John Doe</SelectItem>
              <SelectItem value="jane">Jane Smith</SelectItem>
              <SelectItem value="new">+ Add New Customer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Discount Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-xs font-medium mb-1 block">Discount</label>
              <Select defaultValue="none">
                <SelectTrigger className="w-full h-9 text-sm">
                  <SelectValue placeholder="Select discount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Discount</SelectItem>
                  <SelectItem value="10percent">10% Off</SelectItem>
                  <SelectItem value="20percent">20% Off</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-24">
              <label className="text-xs font-medium mb-1 block">Amount</label>
              <Input type="text" className="h-9 text-sm" placeholder="0.00" disabled />
            </div>
          </div>
        </div>
        
        {/* Payment Method */}
        <div className="mb-4">
          <label className="text-xs font-medium mb-2 block">Payment Method</label>
          <RadioGroup defaultValue="card" className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2 border rounded p-2">
              <RadioGroupItem value="card" id="card" className="h-4 w-4" />
              <Label htmlFor="card" className="flex items-center text-xs">
                <CreditCard className="h-4 w-4 mr-1" />
                Card
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded p-2">
              <RadioGroupItem value="cash" id="cash" className="h-4 w-4" />
              <Label htmlFor="cash" className="flex items-center text-xs">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                Cash
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Order Summary */}
        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold mt-2 text-base">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        <Button className="w-full" size="lg" onClick={onCheckout}>
          <CreditCard className="h-4 w-4 mr-2" /> Pay ${total.toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
