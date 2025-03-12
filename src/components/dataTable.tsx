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

const DataTable: React.FC<Tasks> = ({ id, title, description, completed }) => {
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
        <TableRow>
          <TableCell>{id}</TableCell>
          <TableCell>{title}</TableCell>
          <TableCell>{description}</TableCell>
          <TableCell>{completed}</TableCell>    
        </TableRow> 
      </TableBody>
    </Table>
  )
}

export default DataTable