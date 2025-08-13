'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Sidebar from '@/components/Sidebar';
import { products } from '@/data/products';

export default function Home() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories
  const categories = [...new Set(products.map(p => p.category))];

  // Apply filters when URL params change
  useEffect(() => {
    const category = searchParams.getAll('category');
    const price = searchParams.get('price');
    const search = searchParams.get('search');
    
    if (category.length > 0) {
      setSelectedCategories(category);
    }
    
    if (price) {
      const [min, max] = price.split('-').map(Number);
      setPriceRange([min, max]);
    }
    
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Filter products based on selected criteria
  useEffect(() => {
    let result = products;
    
    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    
    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
    
    // Update URL with current filters
    const params = new URLSearchParams(searchParams);
    params.delete('category');
    selectedCategories.forEach(cat => params.append('category', cat));
    
    if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
      params.set('price', `${priceRange[0]}-${priceRange[1]}`);
    } else {
      params.delete('price');
    }
    
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    
    router.replace(`${pathname}?${params.toString()}`);
  }, [selectedCategories, priceRange, searchQuery, pathname, router, searchParams]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onSearch={handleSearch} />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - Collapses on mobile */}
          <div className="w-full md:w-64">
            <Sidebar 
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
            />
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1">
            {/* No Products Found Message */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-10">
                <h2 className="text-xl font-semibold text-gray-600">
                  No products found. Try adjusting your filters.
                </h2>
                <button 
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 1000]);
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              /* Product Grid - Responsive columns */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="cursor-pointer hover:scale-[1.02] transition-transform duration-200">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}