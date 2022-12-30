"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const clear_1 = __importDefault(require("clear"));
const inquirer_1 = __importDefault(require("inquirer"));
const config_1 = require("./config/config");
const server = (0, express_1.default)();
if (!config_1.databaseType) {
    (0, clear_1.default)();
    inquirer_1.default
        .prompt([
        {
            name: 'faveReptile',
            message: 'What is your favorite reptile?',
            default: 'Alligators'
        },
    ])
        .then((answers) => {
        console.info('Answer:', answers.faveReptile);
    });
}
else {
    server.use((0, cors_1.default)());
    server.use(express_1.default.json());
    server.use(express_1.default.urlencoded({ extended: true }));
    server.get('/', (req, res) => {
        res.status(200).json({ msg: 'Bem vindo' });
    });
    server.listen(3092, () => {
        console.log(`Servidor rodando no endereco:http://localhost:${'process.env.PORT'}`);
    });
}
