import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ productId, quantity = 1 }) {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(productId, quantity);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition text-sm"
    >
      Add to Cart
    </button>
  );
}