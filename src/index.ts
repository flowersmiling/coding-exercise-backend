import express from 'express';
import { connectToDatabase } from './database.services.js';
import { taskRouter } from './routes.task.js';
import cors from 'cors';

const app = express();
const port = 8080;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}

connectToDatabase();

app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.use('/tasks', taskRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});