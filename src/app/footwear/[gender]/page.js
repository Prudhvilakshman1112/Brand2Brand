'use client';

import { useState, useEffect, use } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useAtmosphere } from '@/context/AtmosphereContext';

export default function FootwearGenderPage({ params }) {
  const resolvedParams = use(params);
  const gender = resolvedParams.gender;
  const [activeTab, setActiveTab] = useState('all');
  const { setCurrentAtmosphere } = useAtmosphere();

  useEffect(() => {
    setCurrentAtmosphere('footwear');
  }, [setCurrentAtmosphere]);

  const genderProducts = products.filter(
    p => p.category === 'footwear' && p.gender === gender
  );

  const filtered = activeTab === 'all'
    ? genderProducts
    : genderProducts.filter(p => p.subcategory === activeTab);

  const tabs = gender === 'men'
    ? [
        { key: 'all', label: 'All' },
        { key: 'shoes', label: 'Shoes' },
        { key: 'slides', label: 'Slides' },
      ]
    : [
        { key: 'all', label: 'All' },
        { key: 'casual', label: 'Casual' },
        { key: 'sports', label: 'Sports' },
      ];

  const title = gender === 'men' ? "MEN'S FOOTWEAR" : "WOMEN'S FOOTWEAR";

  return (
    <>
      <section className="category-hero" id="footwear-hero">
        <div className="category-hero-bg" style={{
          background: gender === 'men'
            ? 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #E74C3C 100%)'
            : 'linear-gradient(135deg, #2C1654 0%, #1A1A2E 50%, #E84393 100%)',
        }} />
        <div className="category-hero-content">
          <h1>{title}</h1>
          <p>Step into your style</p>
        </div>
      </section>

      <section className="products-section" id="footwear-products">
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
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              color: 'var(--color-gray-300)',
              fontFamily: 'var(--font-subheading)',
              fontStyle: 'italic',
            }}>
              No products found
            </div>
          )}
        </div>
      </section>
    </>
  );
}
