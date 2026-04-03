import { queryClient } from "@/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@vapor-ui/core";
import type { PropsWithChildren } from "react";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
