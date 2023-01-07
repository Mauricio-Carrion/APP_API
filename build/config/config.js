"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor() {
        this.configJson = '';
        this.database = '';
        this.databaseName = '';
        this.firebirdPath = '';
        this.firebirdDefaultPath = 'C://JF System//Estoque//Dados//JFC.FDB';
        this.host = '127.0.0.1';
        this.mySqlPort = 3306;
        this.firebirdPort = 3050;
    }
}
exports.default = Config;
let firebirdDefaultPath = 'C://JF System//Estoque//Dados//JFC.FDB';
const host = '127.0.0.1';
const mySqlPort = 3306;
const firebirdPort = 3050;
