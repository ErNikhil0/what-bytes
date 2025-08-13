'use client';

export default function Sidebar({ 
  categories, 
  selectedCategories, 
  onCategoryChange,
  priceRange,
  onPriceChange
}) {
  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    onPriceChange(newRange);
  };

  return (
    <div className="w-full md:w-64">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow p-4 mb-6">
        <h3 className="font-semibold text-lg mb-3 text-white">Categories</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category}>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="h-4 w-4 text-blue-200 rounded focus:ring-blue-200 cursor-pointer"
                />
                <span className="ml-2 text-blue-100 hover:text-white">{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow p-4">
        <h3 className="font-semibold text-lg mb-3 text-white">Price Range</h3>
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>
        <div className="flex justify-between text-sm text-blue-100">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}