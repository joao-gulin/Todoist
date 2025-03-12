import express, { Request, Response } from "express"
import cors from 'cors'
import { connectToDatabase } from "./db"

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', async (req: Request, res: Response) => {
  const db = await connectToDatabase()
  const collection = db.collection('todo')
  const data = await collection.find().toArray()
  res.json(data)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})