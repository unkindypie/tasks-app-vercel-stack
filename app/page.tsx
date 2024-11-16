"use client";

import { queryClient } from "@/ui/queries/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Home from "@/ui/pages/home";
import { Wrapper } from "@/ui/components/core/Wrapper";

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <Home />
      </Wrapper>
    </QueryClientProvider>
  );
}
