import mongoose from "mongoose"
import { DB_NAME } from "./constant"

type ConnectionObject = {
  isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database")
    return
  }

  try {
    const db = await mongoose.connect(`${process?.env?.MONGODB_URI}/${DB_NAME}`)
    
    //in case of error console db
    //change the _readyState is required to not connect to DB on every request if existing connection is there
    connection.isConnected = db.connections[0].readyState

    console.log("MongoDB connected successfully")
  } catch (error) {
    console.log("Database connection failed", error)
    process.exit()
  }
}

export default dbConnect
