'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, getNewArrivals } from '@/data/products';
import { useAtmosphere } from '@/context/AtmosphereContext';

export default function HomePage() {
  const heroRef = useRef(null);
  const { setCurrentAtmosphere } = useAtmosphere();

  useEffect(() => {
    setCurrentAtmosphere('default');
  }, [setCurrentAtmosphere]);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      });

      tl.to('.hero h1', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.3');

      tl.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.4');

      tl.to('.hero-cta-group', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const [clientParticles, setClientParticles] = useState(null);

  useEffect(() => {
    // Make asynchronous to satisfy React 19/Next 16 lint rules
    const timer = setTimeout(() => {
      setClientParticles(Array.from({ length: 20 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${10 + Math.random() * 10}s`,
        width: `${1 + Math.random() * 3}px`,
        height: `${1 + Math.random() * 3}px`,
      })));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero" ref={heroRef} id="hero-section">
        <div className="hero-bg" />
        <div className="hero-particles">
          {clientParticles && clientParticles.map((p, i) => (
            <div
              key={i}
              className="hero-particle"
              style={p}
            />
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-badge">Est. Visakhapatnam</div>
          <h1>
            BRAND <span className="hero-2">2</span> BRAND&apos;S
          </h1>
          <p className="hero-subtitle">
            Vizag&apos;s premier destination for men&apos;s fashion, footwear &amp; luxury accessories
          </p>
          <div className="hero-cta-group">
            <Link href="/clothing" className="btn-magnetic">
              EXPLORE COLLECTION
            </Link>
            <Link href="/contact" className="btn-magnetic btn-magnetic--outline" style={{ borderColor: '#fff', color: '#fff' }}>
              VISIT STORE
            </Link>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <span>SCROLL</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="14" height="22" rx="7"/>
            <circle cx="8" cy="8" r="2" fill="currentColor">
              <animate attributeName="cy" values="8;16;8" dur="2s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      </section>

      {/* ATMOSPHERES */}
      <section className="atmospheres-section" id="atmospheres">
        <div className="container">
          <h2 className="section-title">EXPLORE OUR WORLDS</h2>
          <div className="atmospheres-grid">
            <Link href="/clothing" className="atmosphere-card">
              <div className="atmosphere-card-bg" style={{
                backgroundImage: 'url(/images/clothing-atmosphere.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              <div className="atmosphere-card-overlay" />
              <div className="atmosphere-card-content">
                <div className="atmosphere-card-label">Atmosphere A</div>
                <h3 className="atmosphere-card-title">MEN&apos;S CLOTHING</h3>
                <p className="atmosphere-card-desc">Shirts · Jeans · Hoodies · Kurthas</p>
              </div>
            </Link>

            <Link href="/footwear" className="atmosphere-card">
              <div className="atmosphere-card-bg" style={{
                backgroundImage: 'url(/images/footwear-atmosphere.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              <div className="atmosphere-card-overlay" />
              <div className="atmosphere-card-content">
                <div className="atmosphere-card-label">Atmosphere B</div>
                <h3 className="atmosphere-card-title">FOOTWEAR HUB</h3>
                <p className="atmosphere-card-desc">Men &amp; Women · Shoes · Slides · Sports</p>
              </div>
            </Link>

            <Link href="/accessories" className="atmosphere-card">
              <div className="atmosphere-card-bg" style={{
                backgroundImage: 'url(/images/accessories-atmosphere.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              <div className="atmosphere-card-overlay" />
              <div className="atmosphere-card-content">
                <div className="atmosphere-card-label">Atmosphere C</div>
                <h3 className="atmosphere-card-title">ACCESSORIES</h3>
                <p className="atmosphere-card-desc">Luxury Watches · Premium Bags · Essentials</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="trending-section" id="trending">
        <div className="container">
          <h2 className="section-title" style={{ color: '#fff' }}>TRENDING NOW</h2>
          <div className="products-grid">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="products-section" id="new-arrivals">
        <div className="container">
          <h2 className="section-title">NEW ARRIVALS</h2>
          <div className="products-grid">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="brand-story" id="brand-story">
        <div className="container">
          <div className="brand-story-grid">
            <div className="brand-story-content">
              <h2>BORN IN THE <span className="accent-text">CITY OF DESTINY</span></h2>
              <p>
                From the vibrant streets of Pedda Waltair to the sun-kissed shores of 
                RK Beach, Brand Two Brand was born with a mission: to bring world-class 
                men&apos;s fashion to the heart of Visakhapatnam.
              </p>
              <p>
                Every piece in our collection is curated with the same passion that makes 
                Vizag special—a perfect blend of tradition and modernity, comfort and style. 
                Whether it&apos;s the perfect floral shirt for a beach evening or a precision 
                timepiece for a formal gathering, we bring the world&apos;s best to your doorstep.
              </p>
              <Link href="/contact" className="btn-magnetic" style={{ marginTop: '24px' }}>
                VISIT OUR STORE
              </Link>
            </div>
            <div className="brand-story-visual">
              <img
                src="/products/logo/B2blogo.jpg"
                alt="Brand 2 Brand Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
