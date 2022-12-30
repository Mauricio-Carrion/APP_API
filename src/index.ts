const express = require('express');
const cors = require('cors');
const server = express();
const figlet = require('figlet');
const { databaseType } = require('./config/config')
const chalk = require('chalk');

import { Request, Response } from 'express';
const clear = require('clear');
const inquirer = require('inquirer');


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



