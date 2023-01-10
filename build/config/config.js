"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = __importDefault(require("./config.json"));
class Config {
    constructor() {
        this.configJson = config_json_1.default;
        this.firebirdDefaultPath = 'C:\\JF System\\Estoque\\Dados\\JFC.FDB';
        this.database = this.configJson.database;
        this.databaseName = this.configJson.databaseName;
        this.firebirdPath = this.configJson.firebirdPath ? this.configJson.firebirdPath : this.firebirdDefaultPath;
        this.host = '127.0.0.1';
        this.mySqlPort = 3306;
        this.firebirdPort = 3050;
    }
    get db() {
        return this.database;
    }
    get dbName() {
        return this.databaseName;
    }
    get fbPath() {
        return this.firebirdPath;
    }
    get dbhost() {
        return this.host;
    }
    get mysqlPort() {
        return this.mySqlPort;
    }
    get fbPort() {
        return this.firebirdPort;
    }
}
exports.default = Config;
