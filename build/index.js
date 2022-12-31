"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const figlet_1 = __importDefault(require("figlet"));
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const inquirer_1 = __importDefault(require("inquirer"));
const config_1 = require("./config/config");
const ora_1 = __importDefault(require("ora"));
const fs_1 = __importDefault(require("fs"));
const server = (0, express_1.default)();
const runServer = () => {
    const spinner = (0, ora_1.default)('Iniciando servidor...').start();
    setTimeout(() => {
        spinner.succeed();
        server.use((0, cors_1.default)());
        server.use(express_1.default.json());
        server.use(express_1.default.urlencoded({ extended: true }));
        server.get('/', (req, res) => {
            res.status(200).json({ msg: 'Bem vindo' });
        });
        server.listen(3092, () => {
            console.log(`Servidor rodando no endereco:http://localhost:${'process.env.PORT'}`);
        });
    }, 2000);
};
if (!config_1.databaseType) {
    const handleDbName = (dbHash) => {
        if (dbHash.includes('Firebird'))
            return 'Firebird';
        if (dbHash.includes('SQL'))
            return 'MySQL';
    };
    (0, clear_1.default)();
    console.log(chalk_1.default.cyan(figlet_1.default.textSync('JF Server', { horizontalLayout: 'full' })));
    let str;
    inquirer_1.default
        .prompt({
        type: 'list',
        name: 'databaseType',
        message: 'Qual o banco de dados?',
        choices: [chalk_1.default.red.bold('Firebird'), (chalk_1.default.hex('#00758f').bold('My') + chalk_1.default.hex('#F29111').bold('SQL'))],
    })
        .then(answers => {
        str = {
            database: handleDbName(answers.databaseType),
            databaseName: '',
            databasePath: ''
        };
        inquirer_1.default
            .prompt(handleDbName(answers.databaseType) === 'Firebird' ?
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
                }).then(answers => {
            answers.databaseName
                ?
                    str.databaseName = answers.databaseName
                :
                    str.databasePath = answers.databasePath;
            const filename = "src/config/config.json";
            fs_1.default.open(filename, "a", (err, fd) => {
                if (err) {
                    console.log(err.message);
                }
                else {
                    fs_1.default.write(fd, JSON.stringify(str), (err, bytes) => {
                        if (err) {
                            console.log(err.message);
                        }
                        else {
                            runServer();
                        }
                    });
                }
            });
        });
    });
}
else {
    runServer();
}
