import express from "express"
import taskRoutes from './routes/tasks'

const app = express()
app.use(express.json())

app.use('/api', taskRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})