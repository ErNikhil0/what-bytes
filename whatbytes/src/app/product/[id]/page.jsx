import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { products } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Star } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
import QuantitySelector from '@/components/QuantitySelector';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      setProduct(foundProduct || null);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6 text-center">
          <h2 className="text-xl font-semibold text-gray-600">Product not found</h2>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="md:w-1/2">
            <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-gray-600 ml-2">{product.rating.toFixed(1)}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <div className="mb-6">
              <span className="text-gray-600">Category: </span>
              <span className="text-gray-900 font-medium">{product.category}</span>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-gray-700 mr-4">Quantity:</span>
              <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            </div>

            <AddToCartButton productId={product.id} quantity={quantity} />

            {/* Reviews Section */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Reviews</h3>
              {product.reviews && product.reviews.length > 0 ? (
                <div>
                  {product.reviews.map((review, index) => (
                    <div key={index} className="border-t border-gray-200 pt-4 mb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-900 font-medium ml-2">{review.title}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                      <p className="text-gray-500 text-sm mt-2">- {review.author}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}