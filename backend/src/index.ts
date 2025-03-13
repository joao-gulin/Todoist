import express from "express"
import taskRoutes from './routes/tasks'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5000",
  methods: ["GET", "POST", "DELETE", "PUT"]
}))

app.use('/api', taskRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})