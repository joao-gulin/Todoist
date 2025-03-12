import { MongoClient, Db } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const url: string = process.env.MONGODB_URI as string
let db: Db

export const connectToDatabase = async () => {
  if (!db) {
    const client = new MongoClient(url)
    await client.connect()
    db = client.db()
    console.log('Connected to MongoDB')
  }
  return db
}