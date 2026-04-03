'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { useAtmosphere } from '@/context/AtmosphereContext';

export default function ClothingClient({ allProducts, tabs }) {
  const [activeTab, setActiveTab] = useState('all');
  const { setCurrentAtmosphere } = useAtmosphere();

  useEffect(() => {
    setCurrentAtmosphere('clothing');
  }, [setCurrentAtmosphere]);

  const products = activeTab === 'all'
    ? allProducts
    : allProducts.filter(p => p.subcategory === activeTab);

  return (
    <>
      <section className="category-hero" id="clothing-hero">
        <div className="category-hero-bg" style={{
          background: 'linear-gradient(135deg, #1A1A1A 0%, #2C3E50 50%, #C41230 100%)',
        }} />
        <div className="category-hero-content">
          <h1>MEN&apos;S CLOTHING</h1>
          <p>Urban sophistication meets timeless style</p>
        </div>
      </section>

      <section className="products-section" id="clothing-products">
        <div className="container">
          <div className="category-tabs">
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`category-tab ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              color: 'var(--color-gray-300)',
              fontFamily: 'var(--font-subheading)',
              fontStyle: 'italic',
            }}>
              No products found in this category
            </div>
          )}
        </div>
      </section>
    </>
  );
}
