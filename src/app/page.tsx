'use client'
import DataTable from "@/components/dataTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient()
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
