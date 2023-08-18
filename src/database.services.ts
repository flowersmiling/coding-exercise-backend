// External Dependencies
import * as mongoDB from 'mongodb'

// Global Variables
export const collections: {
  task?: mongoDB.Collection
} = {}

// Initialize Connection
export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    "mongodb://dba:666@homecare.canadacentral.cloudapp.azure.com:27017/test" as string
  )
  await client.connect()
  const db: mongoDB.Db = client.db('test')

  const taskCollection: mongoDB.Collection = db.collection('Task')
  collections.task = taskCollection
}
