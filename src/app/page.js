import { getFeaturedProducts, getNewArrivals } from '@/lib/queries';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const [featured, newArrivals] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals(),
  ]);

  return <HomeClient featured={featured} newArrivals={newArrivals} />;
}
