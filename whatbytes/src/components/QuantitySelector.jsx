import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ quantity, onQuantityChange }) {
  const decrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const increase = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded">
      <button
        onClick={decrease}
        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
        disabled={quantity <= 1}
      >
        <Minus size={16} />
      </button>
      <span className="px-4 py-1 text-gray-900">{quantity}</span>
      <button
        onClick={increase}
        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}