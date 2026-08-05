import React from 'react';
import './ProductCard.css';

/**
 * @param {{ product: import('../data').Product }} props
 */
export default function ProductCard({ product }) {
  // Format price as currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(product.price);

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" loading="lazy" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <span className="product-price">{formattedPrice}</span>
          <span className="product-rating" aria-label={`Rating: ${product.rating} out of 5 stars`}>
            {product.rating} ★
          </span>
        </div>
      </div>
    </div>
  );
}
