'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import Image from 'next/image';
import QuantitySelector from '@/components/QuantitySelector';
import PriceSummary from '@/components/PriceSummary';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const cartProducts = cartItems.map(item => {
    const product = products.find(p => p.id === item.id);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter(item => item !== null);

  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Shopping Cart</h1>
        
        {cartProducts.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <Link href="/" className="text-blue-600 hover:underline">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {cartProducts.map((item) => (
                    <li key={item.id} className="p-4 flex flex-col sm:flex-row">
                      <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={100}
                          height={100}
                          className="w-24 h-24 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                            <p className="text-gray-500">${item.price.toFixed(2)}</p>
                          </div>
                          <button 
                            onClick={() => handleRemove(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-4 flex items-center">
                          <QuantitySelector 
                            quantity={item.quantity} 
                            onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)} 
                          />
                          <p className="ml-4 text-gray-900 font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:w-1/3">
              <PriceSummary products={cartProducts} />
              <div className="mt-4">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}