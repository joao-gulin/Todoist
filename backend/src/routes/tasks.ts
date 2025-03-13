import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { number, z } from 'zod'

const prisma = new PrismaClient()
const router = Router()

// Schema validations with zod for the title & description of the task
const taskSchema = z.object({
  title: z.string().min(1, 'Title for the task is required'),
  description: z.string().min(1, 'Description for the task is required'),
})

// Get for all the data in the Api
router.get('/task', async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany()
  res.json(tasks)
})

// Get a single task by the id
router.get('/task/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    // Try to find the task on the id
    const singleTask = await prisma.task.findUnique({
      where: { id: Number(id)}
    })

    // If the task is not found
    if (!singleTask) {
      res.status(404).json({ message: "Task not found" })
    }

    res.json(singleTask)
  } catch (error) {
    res.status(500).json({ message: "Failed to find the task"})
  }
})

// Post for creating a new task with zod validation
router.post('/task', async (req: Request, res: Response) => {
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

// Delete for deleting a task
router.delete('/task/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Attempt to delete the task with the given ID
    const deletedTask = await prisma.task.delete({
      where: { id: Number(id) },
    });

    // If the task was not found, respond with a 404 status
    if (!deletedTask) {
      res.status(404).json({ message: 'Task not found' });
    }

    // Respond with the deleted task data
    res.json(deletedTask);
  } catch (error) {
    // Handle any errors that occur during the delete operation
    res.status(500).json({ error: 'Failed to delete task' });
  }
})

// Put for changing the state of the task from false to true and vice versa
router.put('/task/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    // Attempt to edit the the task with the given ID
    const editedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { completed: true }
    })
    
    // Respond with the put task data
    res.json(editedTask)
  } catch (error) {
    // Handle any errors that occurs
    res.status(500).json({ error: 'Failed to put task' })
  }
})

export default router