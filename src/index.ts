import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import figlet from 'figlet';
import chalk from 'chalk';
import clear from 'clear';
import inquirer from 'inquirer';
import { databaseType } from './config/config'

const server = express();

if (!databaseType) {
  clear()

  inquirer
    .prompt([
      {
        name: 'faveReptile',
        message: 'What is your favorite reptile?',
        default: 'Alligators'
      },
    ])
    .then((answers: { faveReptile: any; }) => {
      console.info('Answer:', answers.faveReptile);
    });

} else {

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.get('/', (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Bem vindo' })
  });

  server.listen(3092, () => {
    console.log(`Servidor rodando no endereco:http://localhost:${'process.env.PORT'}`);
  });

}



