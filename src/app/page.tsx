'use client'
import DataTable from "@/components/dataTable";
import useTask from "@/hooks/useTask";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient())
  const { data = [], error, isLoading } = useTask()

  if (isLoading) {
    return <div>Loading..</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <QueryClientProvider client={queryClient}>
      <DataTable tasks={data} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}