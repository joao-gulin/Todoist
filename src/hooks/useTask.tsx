import taskAPI from "@/api/task";
import type { NewTask, Task } from "@/api/types";
import { QueryClient, useMutation, useQuery, type UseMutateFunction, type UseQueryResult } from "@tanstack/react-query";

export default function seeTasks(): UseQueryResult<Task[], Error> {
  return useQuery({ 
    queryKey: ['tasks'], 
    queryFn: () => taskAPI.getTasks() 
  })
}

export function addTask() {
  const queryClient = new QueryClient() 
  return useMutation({
    mutationFn: (newTask: NewTask) => taskAPI.postTask(newTask.title, newTask.description),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      console.log('Success:', data)
    },
    onError: (error) => {
      // Handle Errors
      console.error('Error creating task', error)
    }
  })
}