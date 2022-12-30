var express = require('express');
var cors = require('cors');
var server = express();
var figlet = require('figlet');
var databaseType = require('./config/config').databaseType;
var chalk = require('chalk');
var clear = require('clear');
var inquirer = require('inquirer');
if (!databaseType) {
    clear();
    inquirer
        .prompt([
        {
            name: 'faveReptile',
            message: 'What is your favorite reptile?',
            default: 'Alligators'
        },
    ])
        .then(function (answers) {
        console.info('Answer:', answers.faveReptile);
    });
}
else {
    server.use(cors());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.get('/', function (req, res) {
        res.status(200).json({ msg: 'Bem vindo' });
    });
    server.listen(3092, function () {
        console.log("Servidor rodando no endereco:http://localhost:".concat('process.env.PORT'));
    });
}
export {};
