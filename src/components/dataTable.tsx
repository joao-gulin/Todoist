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
import { Trash2 } from "lucide-react"

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
              variant="outline" 
              className="cursor-pointer"
              >
                <Trash2 />
              </Button>
            </TableCell>    
          </TableRow>         
        ))} 
      </TableBody>
    </Table>
  )
}

export default DataTable