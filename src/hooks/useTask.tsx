import taskAPI from "@/api/task";
import { useQuery } from "@tanstack/react-query";

export default function useTask() {
  const data = useQuery({ 
    queryKey: ['tasks'], 
    queryFn: () => taskAPI.getTasks() 
  })

  return data
}