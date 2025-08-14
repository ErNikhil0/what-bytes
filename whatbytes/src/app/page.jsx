'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Sidebar from '@/components/Sidebar';
import { products } from '@/data/products';

// Main content component that uses useSearchParams
function ProductListing() {
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
    
    if (category.length > 0) setSelectedCategories(category);
    if (price) setPriceRange(price.split('-').map(Number));
    if (search) setSearchQuery(search);
  }, [searchParams]);

  // Filter products
  useEffect(() => {
    let result = products;
    
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
    
    // Update URL
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

  const handleSearch = (query) => setSearchQuery(query);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onSearch={handleSearch} />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64">
            <Sidebar 
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
            />
          </div>
          <div className="flex-1">
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

// Page component with Suspense boundary
export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-80 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <ProductListing />
    </Suspense>
  );
}
