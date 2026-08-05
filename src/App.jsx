import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import CardNav from './components/CardNav';
import AboutPage from './components/AboutPage';
import { allProducts } from './data';
import { filterProducts, sortProducts } from './filterLogic';

function App() {
  // Determine bounds from allProducts
  const availableCategories = useMemo(() => {
    const cats = new Set(allProducts.map((p) => p.category));
    return Array.from(cats).sort();
  }, []);

  const priceBounds = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    allProducts.forEach((p) => {
      if (p.price < min) min = p.price;
      if (p.price > max) max = p.price;
    });
    // Fallback if empty
    if (min === Infinity) {
      min = 0;
      max = 1000;
    }
    return { minPrice: Math.floor(min), maxPrice: Math.ceil(max) };
  }, []);

  // Filter State
  const initialFilters = {
    categories: [],
    minPrice: null,
    maxPrice: null,
    minRating: null,
  };
  const [filters, setFilters] = useState(initialFilters);

  // Sort State
  const [sortOption, setSortOption] = useState('default');

  // Pipeline computation
  const visibleProducts = useMemo(() => {
    const filtered = filterProducts(allProducts, filters);
    const sorted = sortProducts(filtered, sortOption);
    return sorted;
  }, [filters, sortOption]);

  const resetFilters = () => {
    setFilters(initialFilters);
    setSortOption('default');
  };

  const [currentPage, setCurrentPage] = useState('home');

  const navItems = [
    {
      label: "About",
      bgColor: "#F5F5F5",
      textColor: "#000",
      onClick: () => setCurrentPage('about')
    },
    {
      label: "Deals", 
      bgColor: "#000",
      textColor: "#fff",
    },
    {
      label: "Contact",
      bgColor: "#F5F5F5", 
      textColor: "#000",
    }
  ];

  return (
    <>
      <CardNav
        logoAlt="BuyerHub"
        onLogoClick={() => setCurrentPage('home')}
        items={navItems}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#000"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      {currentPage === 'home' ? (
        <div className="layout">
          <Sidebar
            filters={filters}
            setFilters={setFilters}
            availableCategories={availableCategories}
            priceBounds={priceBounds}
          />
          <ProductGrid
            products={visibleProducts}
            sortOption={sortOption}
            setSortOption={setSortOption}
            resetFilters={resetFilters}
          />
        </div>
      ) : (
        <AboutPage />
      )}
    </>
  );
}

export default App;
