import mysql from 'mysql'
import firebird from 'node-firebird'
import Config from '../config/Config'

const config = new Config

export default class Model {
  mySqlPoll: any
  firebirdPoll: any

  constructor() {
    this.mySqlPoll
    this.firebirdPoll
    this.connectDb()
  }

  private connectDb() {
    if (config.db === "MySQL") {
      this.mySqlPoll = mysql.createPool({
        host: config.dbhost,
        user: 'jf.mysql',
        password: '#@jj2802',
        database: config.dbName
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

  getProdutoMysqlQuery(codigo: number) {
    return new Promise((resolve, reject) => {
      this.mySqlPoll.query('SELECT 1 + 1 AS solution', (error: any, results: any) => {
        if (error) { reject(error); throw error };

        if (results) {
          resolve(results)
        }
      })
    })
  }

  getProdutoFirebirdQuery(codigo: number) {
    return new Promise((resolve, reject) => {
      this.firebirdPoll.get((err: any, db: any) => {
        if (err) { reject(err); throw err };

        db.query('SELECT * FROM TABLE', (err: any, result: any) => {
          if (err) throw err;

          if (result) {
            resolve(result)
          }

          db.detach();
        });
      });
    })
  }

}