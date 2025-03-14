'use client'
import React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { Check, Trash2 } from "lucide-react"
import { completeTask, removeTask } from "@/hooks/useTask"
import { toast } from "sonner"

interface Tasks {
  id: number,
  title: string,
  description: string,
  completed: boolean,
}

interface DataTableProps {
  tasks?: Tasks[]
}

const DataTable: React.FC<DataTableProps> = ({ tasks = [] }) => {
  const { mutate: deleteTask} = removeTask()
  const { mutate: completeTasks } = completeTask()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Completed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks?.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.completed ? 'Yes' : 'No' }</TableCell>
            <TableCell>
              <Button
              type="button"
              variant="destructive"
              className="cursor-pointer"
              onClick={() => toast.warning("Warning", {
                description: "Do you wish to delete this task?",
                action: (
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      onClick={() => deleteTask(task.id)}
                      className="cursor-pointer bg-green-800 hover:bg-green-900"
                    >
                      Yes
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => toast.dismiss()}
                      className="cursor-pointer bg-red-800 hover:bg-red-900"
                    >
                      No
                    </Button>
                  </div>
                )
              })}
              >
                <Trash2 />
              </Button>
            </TableCell>
            {!task.completed && (
              <TableCell>
                <Button
                type="button"
                variant="outline"
                className="cursor-pointer bg-green-800 hover:bg-green-900"
                onClick={() => {
                  completeTasks(task.id)
                  toast.success("Task Completed!")
                }}
                >
                  <Check />
                </Button>
              </TableCell>
            )} 
          </TableRow>         
        ))} 
      </TableBody>
    </Table>
  )
}

export default DataTable