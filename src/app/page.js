import { getFeaturedProducts, getNewArrivals } from '@/lib/queries';
import HomeClient from './HomeClient';

export const revalidate = 7200; // Revalidate every 2 hours — reduces ISR writes

export default async function HomePage() {
  const [featured, newArrivals] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals(),
  ]);

  return <HomeClient featured={featured} newArrivals={newArrivals} />;
}
