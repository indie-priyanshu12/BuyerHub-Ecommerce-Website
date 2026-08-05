import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

export default function ProductGrid({
  products,
  sortOption,
  setSortOption,
  resetFilters,
}) {
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <main className="main-content">
      <div className="grid-header">
        <div className="results-count" aria-live="polite">
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </div>
        <div className="sort-container">
          <label htmlFor="sort-select" className="sr-only">Sort by</label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Top Rated First</option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <p className="empty-message">No items match your criteria.</p>
          <button className="btn-danger" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
