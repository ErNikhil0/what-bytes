'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User } from 'lucide-react';
import CartIcon from './CartIcon';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header({ onSearch }) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchInput);
      const params = new URLSearchParams();
      if (searchInput) {
        params.set('search', searchInput);
      }
      router.replace(`/?${params.toString()}`);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          <div>
            <Link href="/" className="text-xl font-bold text-white">
              Whatbytes
            </Link>
          </div>

          <div className="flex-1 mx-8">
            <form onSubmit={handleSearch} className="flex max-w-md mx-auto">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-blue-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 bg-blue-50 text-blue-900 placeholder-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-700 text-white px-4 py-2 rounded-r-md hover:bg-blue-800 transition flex items-center justify-center"
              >
                <Search size={20} className="text-blue-100" />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <CartIcon />
            <button className="p-2 rounded-full text-blue-100 hover:text-white hover:bg-blue-500/30 transition">
              <User size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}