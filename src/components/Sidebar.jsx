import React from 'react';
import './Sidebar.css';

export default function Sidebar({ filters, setFilters, availableCategories, priceBounds }) {
  const { minPrice, maxPrice } = priceBounds;
  const currentMinPrice = filters.minPrice !== null ? filters.minPrice : minPrice;
  const currentMaxPrice = filters.maxPrice !== null ? filters.maxPrice : maxPrice;

  const handleCategoryChange = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    
    setFilters((prev) => ({ ...prev, categories: updatedCategories }));
  };

  const handleMinPriceChange = (e) => {
    const val = parseInt(e.target.value, 10);
    // Don't let min exceed max
    if (val > currentMaxPrice) return;
    setFilters((prev) => ({ ...prev, minPrice: val }));
  };

  const handleMaxPriceChange = (e) => {
    const val = parseInt(e.target.value, 10);
    // Don't let max go below min
    if (val < currentMinPrice) return;
    setFilters((prev) => ({ ...prev, maxPrice: val }));
  };

  const handleRatingChange = (ratingVal) => {
    setFilters((prev) => ({ ...prev, minRating: ratingVal }));
  };

  return (
    <aside className="sidebar">
      <div className="filter-group">
        <h2 className="section-header">Category</h2>
        <div className="checkbox-list">
          {availableCategories.map((cat) => (
            <label key={cat} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              <span className="checkbox-text">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h2 className="section-header">Price</h2>
        <div className="price-slider-container">
          <div className="price-labels">
            <span>₹{currentMinPrice}</span>
            <span>₹{currentMaxPrice}</span>
          </div>
          <div className="dual-slider">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={currentMinPrice}
              onChange={handleMinPriceChange}
              className="slider-input min-slider"
              aria-label="Minimum price"
            />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={currentMaxPrice}
              onChange={handleMaxPriceChange}
              className="slider-input max-slider"
              aria-label="Maximum price"
            />
          </div>
        </div>
      </div>

      <div className="filter-group">
        <h2 className="section-header">Rating</h2>
        <div className="radio-list">
          <label className="radio-label">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === null}
              onChange={() => handleRatingChange(null)}
            />
            <span className="radio-text">Any</span>
          </label>
          {[4, 3, 2, 1].map((star) => (
            <label key={star} className="radio-label">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === star}
                onChange={() => handleRatingChange(star)}
              />
              <span className="radio-text">{star} ★ &amp; up</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
