"use client";

import { queryClient } from "@/app/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Home from "@/ui/pages/home";

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
