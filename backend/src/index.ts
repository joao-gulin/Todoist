import express from "express"
import { PrismaClient } from '@prisma/client'
import { z, ZodError } from 'zod'

const app = express()
const prisma = new PrismaClient()
app.use(express.json())

const taskSchema = z.object({
  title: z.string().min(1, 'Title for the task is required'),
  description: z.string().min(1, 'Description for the task is required'),
})

app.get('/task', async (req, res) => {
  const tasks = await prisma.task.findMany()
  res.json(tasks)
})

app.post('/task', async (req, res) => {
  try {
    taskSchema.parse(req.body) // Validate request body
    const { title, description } = req.body;
    const newTask = await prisma.task.create({
      data: { title, description },
    })
    res.status(201).json(newTask)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error.errors)
    } else {
      res.status(500).json({ error: 'Failed to create user' })
    }
  }
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})