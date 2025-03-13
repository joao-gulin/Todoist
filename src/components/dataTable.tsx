'use client'
import React from "react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { Check, Trash2 } from "lucide-react"
import { removeTask } from "@/hooks/useTask"

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Completed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks?.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.id}</TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.completed ? 'Yes' : 'No' }</TableCell>
            <TableCell>
              <Button
              type="button"
              variant="destructive"
              className="cursor-pointer"
              onClick={() => deleteTask(task.id)}
              >
                <Trash2 />
              </Button>
            </TableCell>
            <TableCell>
              <Button
                type="button"
                className="cursor-pointer bg-green-800 hover:bg-green-900"
                variant="outline"
              >
               <Check /> 
              </Button>
            </TableCell>    
          </TableRow>         
        ))} 
      </TableBody>
    </Table>
  )
}

export default DataTable