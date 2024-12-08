import { HomePageClient } from '@/app/home-page-client';
import { getTasks } from '@/services/tasks';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function HomePageServer() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['tasks', ''],
    queryFn: () => getTasks(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePageClient />
    </HydrationBoundary>
  );
}
