import { exec } from 'child_process'
import { cwd } from 'process'
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
        database: `${config.dbName}.jfc`
      });
    }

    if (config.db === "Firebird") {
      this.firebirdPoll = firebird.pool(5, {
        host: config.dbhost,
        port: config.fbPort,
        database: config.fbPath,
        retryConnectionInterval: 1000,
        user: 'JFFDB08',
        password: 'jj0902',
      });
    }
  }

  private rodaScript() {
    exec(`${cwd()}\\build\\config\\Script.bat`, (error) => {
      if (error) {
        console.error(error)
      }
    })
  }

  getProdutoMysqlQuery(codigo: string) {
    return new Promise((resolve, reject) => {
      this.mySqlPoll.query(`SELECT jfc037.codprod, jfc037.nomprod, jfc037.saldatua, jfc036.UNUNIT FROM jfc037 JOIN jfc036 ON jfc037.codprod = jfc036.codprod AND jfc037.codprod = '${codigo}';`, (error: any, results: any) => {
        if (error) { reject(error) };

        if (results) {
          resolve(results[0])
        }
      })
    })
  }

  getProdutoFirebirdQuery(codigo: string) {
    return new Promise((resolve, reject) => {
      this.firebirdPoll.get((err: any, db: any) => {
        if (err) { reject(err); throw err };

        db.query(`SELECT jfc037.codprod, jfc037.nomprod, jfc037.saldatua, jfc036.UNUNIT FROM jfc037 JOIN jfc036 ON jfc037.codprod = jfc036.codprod AND jfc037.codprod = '${codigo}';`, (err: any, result: any) => {

          if (err) {
            this.rodaScript()
            reject(err)
          }

          if (result) {
            resolve(result[0])
          }

          db.detach();
        });
      });
    })
  }

  putSaldoProdutoFirebirdQuery(codigo: string, saldo: string) {
    return new Promise((resolve, reject) => {
      this.firebirdPoll.get((err: any, db: any) => {
        if (err) { reject(err); throw err };

        db.query(`UPDATE jfc037 SET saldatua = '${saldo}' WHERE codprod = '${codigo}';`, (err: any, result: any) => {

          if (err) {
            this.rodaScript()
            reject(err)
          }

          if (result) {
            resolve(result[0])
          }

          db.detach();
        });
      });
    })
  }

  putSaldoProdutoMysqlQuery(codigo: string, saldo: string) {
    return new Promise((resolve, reject) => {
      this.mySqlPoll.query(`UPDATE jfc037 SET saldatua = '${saldo}' WHERE codprod = '${codigo}';`, (error: any, results: any) => {
        if (error) { reject(error) };

        if (results) {
          resolve(results[0])
        }
      })
    })
  }

}