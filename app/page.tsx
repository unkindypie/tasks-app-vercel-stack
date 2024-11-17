import React from "react";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getTasks } from "@/services/tasks";
import { HomePageClient } from "@/app/home-page-client";

export default async function HomePageServer() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tasks", ""],
    queryFn: () => getTasks(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePageClient />
    </HydrationBoundary>
  );
}
