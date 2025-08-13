'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

      <div className="relative aspect-square w-full overflow-hidden">
        <Image 
          src={product.image} 
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-110"
          priority={false}
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-1 hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">{product.rating.toFixed(1)}</span>
        </div>
        <p className="text-gray-900 font-bold text-lg">${product.price.toFixed(2)}</p>
        <div className="mt-4">
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}