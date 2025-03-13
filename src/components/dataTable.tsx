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
      <TableCaption>A list of your tasks</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Completed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks?.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.id}</TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.completed}</TableCell>    
          </TableRow>         
        ))} 
      </TableBody>
    </Table>
  )
}

export default DataTable