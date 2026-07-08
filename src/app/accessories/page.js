import { getAccessoriesGrouped } from '@/lib/queries';
import AccessoriesClient from './AccessoriesClient';

export const revalidate = 7200; // Revalidate every 2 hours — reduces ISR writes

export default async function AccessoriesPage() {
  const { menWatches, womenWatches, bags } = await getAccessoriesGrouped();

  return (
    <AccessoriesClient
      menWatches={menWatches}
      womenWatches={womenWatches}
      bags={bags}
    />
  );
}
