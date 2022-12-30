import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import figlet from 'figlet';
import chalk from 'chalk';
import clear from 'clear';
import inquirer from 'inquirer';
import { databaseType } from './config/config';
import fs from 'fs';

const server = express();

if (!databaseType) {
  const handleDbName = (dbHash: string) => {
    if (dbHash.includes('Firebird'))
      return 'Firebird'
    if (dbHash.includes('MySQL'))
      return 'MySQL'
  }

  clear()

  console.log(
    chalk.bgBlueBright.white(
      figlet.textSync('JF App Server', { horizontalLayout: 'full' })
    )
  )

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'databaseType',
        message: 'Qual o banco de dados?',
        choices: [chalk.bgRed.black.bold('Firebird'), chalk.bgCyan.hex('#F29111').bold('MySQL')],
      }
    ])

    .then(answers => {
      const str: string = handleDbName(answers.databaseType)!;
      const filename = "src/config/config.txt";

      fs.open(filename, "a", (err, fd) => {
        if (err) {
          console.log(err.message);
        } else {
          fs.write(fd, str, (err, bytes) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log(bytes + ' bytes written');
            }
          })
        }
      })
    })
}

if (databaseType) {

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



