import taskAPI from "@/api/task";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function useTask(): UseQueryResult<Task[], Error> {
  return useQuery({ 
    queryKey: ['tasks'], 
    queryFn: () => taskAPI.getTasks() 
  })
}