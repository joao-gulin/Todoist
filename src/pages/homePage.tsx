import taskAPI from "@/api/task"
import DataTable from "@/components/dataTable"
import { Button } from "@/components/ui/button"
import useTask from "@/hooks/useTask"
import { useMutation } from "@tanstack/react-query"
import { CirclePlus } from 'lucide-react'

export default function HomePage() {
  const { data = [], error, isLoading } = useTask()
  const mutation = useMutation({
    mutationFn: taskAPI.postTask(),
    onSuccess: (data) => {
      console.log('Task created successfully', data)
    },
    onError: (error) => {
      // Handle errors
      console.error('Error creating task', error)
    }
  })

  if (isLoading) {
    return <div>Loading..</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-2 mr-2">
        <Button className="cursor-pointer">
          <CirclePlus /> Add Task
        </Button>
      </div>
      <div className="border rounded">
        <DataTable tasks={data} />
      </div>
    </div>
  )
}