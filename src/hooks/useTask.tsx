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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: (error) => {
      // Handle Errors
      console.error('Error creating task', error)
    }
  })
}

export function removeTask() {
  const queryClient = new QueryClient()
  return useMutation({
    mutationFn: (taskId: number) => taskAPI.deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: (error) => {
      console.error("Error deleting task", error)
    }
  })
}