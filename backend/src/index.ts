import express, { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get('/task', async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany()
  res.json(tasks)
})

app.post('/task', async (req, res) => {
  const { title, description } = req.body
  const task = await prisma.task.create({
    data: { title, description },
  })
  res.json(task)
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})