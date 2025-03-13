import DataTable from "@/components/dataTable"
import { Button } from "@/components/ui/button"
import { CirclePlus } from 'lucide-react'
import { NewTask } from "@/api/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import seeTasks, { addTask } from "@/hooks/useTask"
import { toast } from "sonner"

export default function HomePage() {
  const { data = [], error, isLoading } = seeTasks()
  const { mutate: addNewTask } = addTask()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [open, setOpen] = useState(false)
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value)
  }
  
  // Event handler to trigger the mutation
  const handleSubmit = (e: React.FormEvent) => {
    if (!title || !description) {
      toast.error("Error on the creation", {
        description: "Please don't leave the title or the description empty"
      })
    } else {
      e.preventDefault()
      const newTask: NewTask = {
        title: title,
        description: description
      }
      addNewTask(newTask)
      setOpen(false)
      setTitle('')
      setDescription('')
      toast.success("Task Created Sucessfully")
    }
  }

  if (isLoading) {
    return <div>Loading..</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  
  return (
    <form>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-2 mr-2">
          {/*Dialog Button Area for Adding Task*/}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer">
                <CirclePlus /> Add Task 
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add new task</DialogTitle>
                <DialogDescription>
                  Add a new task with a title and a description for it 
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input 
                    id="title"
                    defaultValue=""
                    className="col-span-3"
                    onChange={handleTitleChange}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input 
                    id="description"
                    defaultValue=""
                    className="col-span-3"
                    onChange={handleDescriptionChange}
                  />
                </div> 
              </div>
              <DialogFooter>
                <Button type="submit" 
                className="cursor-pointer" 
                onClick={handleSubmit}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {/* Data Table for the tasks*/}
        <div className="border rounded">
          <DataTable tasks={data} />
        </div>
      </div> 
    </form>
  )
}