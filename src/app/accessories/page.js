import { getAccessoriesGrouped } from '@/lib/queries';
import AccessoriesClient from './AccessoriesClient';

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
