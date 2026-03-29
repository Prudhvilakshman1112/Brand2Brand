'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change, asynchronously for lint
    const timer = setTimeout(() => {
      setMobileOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { href: '/clothing', label: 'Clothing' },
    { href: '/footwear', label: 'Footwear' },
    { href: '/accessories', label: 'Accessories' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header className="header" style={scrolled ? { background: 'rgba(13,13,13,0.98)' } : {}}>
        <div className="header-inner">
          <Link href="/" className="header-logo" id="brand-logo">
            <div>
              <span>BRAND</span>
              <span className="logo-2">2</span>
              <span>BRAND&apos;S</span>
              <span className="logo-sub">Fashion Store</span>
            </div>
          </Link>

          <nav className="header-nav">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname.startsWith(link.href) ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="cart-btn"
              onClick={() => setIsOpen(true)}
              aria-label="Open cart"
              id="cart-button"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </button>

            <button
              className={`mobile-toggle ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />
      <nav className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
