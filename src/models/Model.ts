import mysql from 'mysql'
import firebird from 'node-firebird'
import Config from '../config/Config'

const config = new Config

export default class Model {
  mySqlPoll: any
  firebirdPoll: any

  constructor() {
    this.connectDb()
    this.mySqlPoll
    this.firebirdPoll
  }

  private connectDb() {
    if (config.db === "MySQL") {
      this.mySqlPoll = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      });
    }

    if (config.db === "Firebird") {
      this.firebirdPoll = firebird.pool(5, {
        host: config.dbhost,
        port: config.fbPort,
        database: config.dbName,
        user: 'JFFDB08',
        password: 'jj0902',
      });
    }
  }

  getProdutoFirebirdQuery() {

  }

  getProdutoMysqlQuery() {

  }
}