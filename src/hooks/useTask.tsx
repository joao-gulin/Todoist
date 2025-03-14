import taskAPI from "@/api/task";
import type { NewTask, Task } from "@/api/types";
import queryClient from "@/queryClient";
import { useMutation, useQuery, type UseQueryResult } from "@tanstack/react-query";

export default function seeTasks(): UseQueryResult<Task[], Error> {
  return useQuery({ 
    queryKey: ['tasks'], 
    queryFn: () => taskAPI.getTasks() 
  })
}

export function addTask() {
  return useMutation({
    mutationFn: (newTask: NewTask) => taskAPI.postTask(newTask.title, newTask.description),
    onMutate: async (newTask) => {
      // Cancel any outgoing refetches to prevent overwriting
      await queryClient.cancelQueries({ queryKey: ['tasks']})

      // Snapshot previous tasks
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])

      // Optimistically update by adding the new task
      // temporary task
      queryClient.setQueryData<Task[]>(['tasks'], (old = []) => [
        ...old,
        { id: Date.now(), title: newTask.title, description: newTask.description, completed: false },
      ])

      // Return context with previous data in case its needed to rollback
      return { previousTasks }
    },
    onError: (error, newTask, context) => {
      // Roll back the optimistic update on error
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks)
      }
      console.error("Error creating task!", error)
    },
    onSettled: () => {
      // Re-fetch tasks whether mutations succeeds or not
      queryClient.invalidateQueries({ queryKey: ['tasks' ]})
    }
  })
}

export function removeTask() {
  return useMutation({
    mutationFn: (taskId: number) => taskAPI.deleteTask(taskId),
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
      // Does a filter to mimick the act of deleting from the table until it really gets deleted
      queryClient.setQueryData<Task[]>(['tasks'], (old = []) => 
        old.filter(task => task.id !== taskId)
      )
      return { previousTasks }
    },
    onError: (error, taskId, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks)
      }
      console.error("Error deleting task", error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })
}

export function completeTask() {
  return useMutation({
    mutationFn: (taskId: number) => taskAPI.completeTask(taskId),
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
      queryClient.setQueryData<Task[]>(['tasks'], (old = []) => 
        old.map(task => task.id === taskId ? { ...task, completed: true} : task)
      )
      return { previousTasks }
    },
    onError: (error, taskId, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks)
      }
      console.error("Error deleting task", error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })
}