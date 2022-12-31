"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebirdPort = exports.mySqlPort = exports.host = exports.firebirdPath = exports.databaseName = exports.databaseType = void 0;
const fs_1 = __importDefault(require("fs"));
let configJson;
let configObj;
let firebirdDefaultPath = 'C://JF System//Estoque//Dados//JFC.FDB';
exports.databaseType = '';
exports.databaseName = '';
exports.firebirdPath = '';
exports.host = '127.0.0.1';
exports.mySqlPort = 3306;
exports.firebirdPort = 3050;
if (fs_1.default.existsSync('../config/config.json')) {
    configJson = '../config/config.json';
    configObj = JSON.parse(configJson);
    exports.databaseType = configObj.database;
    exports.databaseName = configObj.databaseName ? configObj.databaseName : '';
    exports.firebirdPath = configObj.firebirdPath ? configObj.firebirdPath : firebirdDefaultPath;
}
else {
    console.log('Arquivo de configuração não encontrado!');
}
