import express, { Request, Response } from 'express';
import cors from 'cors';
import figlet from 'figlet';
import chalk from 'chalk';
import clear from 'clear';
import inquirer from 'inquirer';
import { databaseType } from './config/config';
import ora from 'ora'
import fs from 'fs';

const server = express();

const runServer = () => {
  const spinner = ora('Iniciando servidor...').start();

  setTimeout(() => {
    spinner.succeed()

    server.use(cors());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    server.get('/', (req: Request, res: Response) => {
      res.status(200).json({ msg: 'Bem vindo' })
    });

    server.listen(3092, () => {
      console.log(`Servidor rodando no endereco:http://localhost:${'process.env.PORT'}`);
    });
  }, 2000);

}

if (!databaseType) {
  const handleDbName = (dbHash: string) => {
    if (dbHash.includes('Firebird'))
      return 'Firebird'

    if (dbHash.includes('SQL'))
      return 'MySQL'
  }

  clear()

  console.log(
    chalk.cyan(
      figlet.textSync('JF Server', { horizontalLayout: 'full' })
    )
  )

  interface Str {
    database: string,
    databaseName: string,
    databasePath: string
  }

  let str: Str

  inquirer
    .prompt(
      {
        type: 'list',
        name: 'databaseType',
        message: 'Qual o banco de dados?',
        choices: [chalk.red.bold('Firebird'), (chalk.hex('#00758f').bold('My') + chalk.hex('#F29111').bold('SQL'))],
      }
    )
    .then(answers => {
      str = {
        database: handleDbName(answers.databaseType)!,
        databaseName: '',
        databasePath: ''
      }

      inquirer
        .prompt(
          handleDbName(answers.databaseType) === 'Firebird' ?
            {
              type: 'input',
              name: 'databasePath',
              message: 'Digite o caminho do banco de dados',
            }
            :
            {
              type: 'input',
              name: 'databaseName',
              message: 'Digite o nome do banco de dados'
            }
        ).then(answers => {
          answers.databaseName
            ?
            str.databaseName = answers.databaseName
            :
            str.databasePath = answers.databasePath

          const filename = "src/config/config.json";

          fs.open(filename, "a", (err, fd) => {
            if (err) {
              console.log(err.message);
            } else {
              fs.write(fd, JSON.stringify(str), (err, bytes) => {
                if (err) {
                  console.log(err.message);
                } else {
                  runServer()
                }
              })
            }
          })
        })

    })

} else {

  runServer()

}







