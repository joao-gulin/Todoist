import DataTable from "@/components/dataTable"
import useTask from "@/hooks/useTask"

export default function HomePage() {
  const { data = [], error, isLoading } = useTask()

  if (isLoading) {
    return <div>Loading..</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="border rounded">
        <DataTable tasks={data} />
      </div>
    </div>
  )
}