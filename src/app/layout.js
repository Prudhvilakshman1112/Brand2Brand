import './globals.css';
import dynamic from 'next/dynamic';
import { CartProvider } from '@/context/CartContext';
import { AtmosphereProvider } from '@/context/AtmosphereContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

// Lazy-load heavy components — still SSR but code-split into separate chunks
const CartDrawer = dynamic(() => import('@/components/CartDrawer'));
const VizagIntro = dynamic(() => import('@/components/VizagIntro'));

export const metadata = {
  title: 'Brand 2 Brand | Premium Multi-Brand E-Commerce Store',
  description:
    'Shop the latest premium clothing, footwear, and accessories at Brand 2 Brand. Discover exclusive trends and top-tier styles with nationwide delivery.',
  keywords: 'Brand 2 Brand, premium fashion, clothing, footwear, accessories, e-commerce, nationwide delivery',
  openGraph: {
    title: 'Brand 2 Brand | Premium Multi-Brand E-Commerce Store',
    description:
      'Shop the latest premium clothing, footwear, and accessories at Brand 2 Brand. Discover exclusive trends and top-tier styles with nationwide delivery.',
    type: 'website',
    url: 'https://brand2brands.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          <AtmosphereProvider>
            <VizagIntro />
            <Header />
            <CartDrawer />
            <main className="page-content">
              <h1 className="sr-only">Brand 2 Brand E-Commerce Store</h1>
              {children}
            </main>
            <Footer />
            <WhatsAppWidget />
            <SpeedInsights />
            <Analytics />
          </AtmosphereProvider>
        </CartProvider>
      </body>
    </html>
  );
}
