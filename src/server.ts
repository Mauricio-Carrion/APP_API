import express, { Request, Response } from 'express';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req: Request, res: Response) => {
  res.send('Bem vindo ao ScanJF Server')
});

server.listen(3092);