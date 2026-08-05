/**
 * @typedef {Object} FilterState
 * @property {string[]} categories - Selected category names
 * @property {number|null} minPrice - Minimum price bound
 * @property {number|null} maxPrice - Maximum price bound
 * @property {number|null} minRating - Minimum rating bound (1-5)
 */

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {string} imageUrl
 * @property {number} price
 * @property {number} rating
 * @property {string} category
 */

/**
 * Filter products based on selected filter state.
 * @param {Product[]} products 
 * @param {FilterState} filters 
 * @returns {Product[]}
 */
export function filterProducts(products, filters) {
  if (!products || products.length === 0) return [];

  return products.filter(product => {
    // 1. Category Filter (OR logic within, bypass if empty)
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(product.category)) {
        return false;
      }
    }

    // 2. Price Filter
    if (filters.minPrice !== null && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== null && product.price > filters.maxPrice) {
      return false;
    }

    // 3. Rating Filter
    if (filters.minRating !== null && product.rating < filters.minRating) {
      return false;
    }

    return true; // Passed all active filters
  });
}

/**
 * Sort products based on selected sort option.
 * @param {Product[]} products 
 * @param {string} sortOption 'default' | 'price-asc' | 'price-desc' | 'rating-desc'
 * @returns {Product[]}
 */
export function sortProducts(products, sortOption) {
  if (!products || products.length === 0) return [];

  // Always return a new array
  const sorted = [...products];

  switch (sortOption) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case 'default':
    default:
      // default is the order they are in the array
      break;
  }

  return sorted;
}
