import express, { Application, Request, Response } from 'express';
import routes from './routes/routes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app: Application = express();
const port: number = 5000;

app.use(express.json());
app.use(cors());
app.use('/api', routes)

app.get('/', (_req: Request, res: Response) => {
  res.send('Server is running');
});

app.listen(port, () => 
  console.log(`Server is running on http://localhost:${port}`)
);