// External Dependencies
import express, { Request, Response, Router } from 'express'
import { ObjectId } from 'mongodb'
import Task from './models.task.js'
import { collections } from './database.services.js'
// Global Config
export const taskRouter: Router = express.Router()
taskRouter.use(express.json())

// GET
taskRouter.get('/doing', async (req: Request, res: Response) => {
  try {
    const query = { status: 'doing' }
    const tasks = (await collections.task
      ?.find(query)
      .toArray()) as Task[]
    res.status(200).send(tasks)
  } catch (error) {
    res.status(500).send(error)
  }
})

// GET
taskRouter.get('/done', async (req: Request, res: Response) => {
  try {
    const query = { status: 'done' }
    const tasks = await collections.task?.aggregate([
      { $match: query },
      { $limit: 10 },
      { $sort: { date: -1 } },
    ]).toArray() as Task[]
    res.status(200).send(tasks)
  } catch (error) {
    res.status(500).send(error)
  }
})

// POST
taskRouter.post('/', async (req: Request, res: Response) => {
    try {
      const newTask = {
        content: req.body.content,
        date: new Date(req.body.date),
        status: req.body.status
      } as Task
      const result = await collections.task?.insertOne(newTask)
  
      result
        ? res.status(201).send(result)
        : res.status(500).send(`Failed to create a new Task.`)
    } catch (error) {
      console.error(error)
      res.status(400).send(error)
    }
  })

  // PUT
taskRouter.put('/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id

  try {
    const query = { _id: new ObjectId(id) }

    const result = await collections.task?.updateOne(query, {
      $set: {
        status: req.body.status
      }
    })

    result
      ? res.status(200).send(result)
      : res.status(304).send(`Task with id: ${id} not updated`)
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
})

// DELETE ALL
taskRouter.delete('/', async (req: Request, res: Response) => {
  try {
    const result = await collections.task?.deleteMany()

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed all Tasks`)
    } else if (!result) {
      res.status(400).send(`Failed to remove Tasks`)
    } else if (!result.deletedCount) {
      res.status(404).send(`Tasks does not exist`)
    }
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
})