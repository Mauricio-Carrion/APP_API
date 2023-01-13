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
        database: `${config.dbName}.jfc`,
        multipleStatements: true,
        supportBigNumbers: true
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
      this.mySqlPoll.query(`SELECT jfc037.codempr, jfc037.codprod, jfc037.nomprod, jfc037.saldatua, jfc036.UNUNIT FROM jfc037 JOIN jfc036 ON jfc037.codprod = jfc036.codprod AND jfc037.codprod = '${codigo}';`, (error: any, results: any) => {
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
        if (err) {
          this.rodaScript()
          reject(err);
          throw err
        };

        db.query(`SELECT jfc037.codempr, jfc037.codprod, jfc037.nomprod, jfc037.saldatua, jfc036.UNUNIT FROM jfc037 JOIN jfc036 ON jfc037.codprod = jfc036.codprod AND jfc037.codprod = '${codigo}';`, (err: any, result: any) => {

          if (err) {
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

  putSaldoProdutoFirebirdQuery(empresa: string, codigo: string, produto: string, saldo: number, saldoAnterior: number) {
    return new Promise((resolve, reject) => {
      this.firebirdPoll.get((err: any, db: any) => {
        if (err) { reject(err); throw err };

        db.query(`execute block as 
        begin 
        UPDATE jfc037 
        SET saldatua = ${saldo.toFixed(3)}, dtalt = CURRENT_DATE 
        WHERE codprod = '${codigo}';
        INSERT INTO JFC049 (TELA, DTEXCL, HREXCL, USUARIO, OBS) 
        VALUES ('Produtos Saldo', CURRENT_DATE, CURRENT_TIME, 'ScanJF', 'Empresa: ${empresa} - Código: ${codigo} Produto: ${produto} - Saldo anterior: ${saldoAnterior} Saldo atual: ${saldo}'); 
        end`,
          (err: any, result: any) => {

            if (err) {
              reject(err)
              throw err
            }

            resolve(result)

            db.detach();
          });
      });
    })
  }

  putSaldoProdutoMysqlQuery(empresa: string, codigo: string, produto: string, saldo: number, saldoAnterior: number) {
    return new Promise((resolve, reject) => {
      this.mySqlPoll.query(`
      UPDATE jfc037 
      SET saldatua = ${saldo}, dtalt = CURRENT_DATE 
      WHERE codprod = '${codigo}';
      INSERT INTO JFC049 (TELA, DTEXCL, HREXCL, USUARIO, OBS) 
      VALUES ('Produtos Saldo', CURRENT_DATE, CURRENT_TIME, 'ScanJF', 'Empresa: ${empresa} - Código: ${codigo} Produto: ${produto} - Saldo anterior: ${saldoAnterior} Saldo atual: ${saldo}');`,
        (error: any, results: any) => {
          if (error) { reject(error) };

          if (results) {
            resolve(results[0])
          }
        })
    })
  }

}