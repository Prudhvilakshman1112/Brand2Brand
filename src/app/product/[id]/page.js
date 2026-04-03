import { getProductById, getRelatedProducts } from '@/lib/queries';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    const { default: Link } = await import('next/link');
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>Product Not Found</h1>
        <Link href="/" className="btn-magnetic">GO HOME</Link>
      </div>
    );
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
