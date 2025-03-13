'use client'
import HomePage from "@/pages/homePage";
import queryClient from "@/queryClient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage/>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}