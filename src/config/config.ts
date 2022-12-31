import fs from "fs";

let configJson: string
let configObj: ConfigObj
let firebirdDefaultPath = 'C://JF System//Estoque//Dados//JFC.FDB'
interface ConfigObj {
  database: string,
  databaseName: string,
  firebirdPath: string
}

export let databaseType = ''
export let databaseName = ''
export let firebirdPath = ''
export const host = '127.0.0.1'
export const mySqlPort = 3306
export const firebirdPort = 3050

if (fs.existsSync('../config/config.json')) {

  configJson = '../config/config.json'
  configObj = JSON.parse(configJson)
  databaseType = configObj.database
  databaseName = configObj.databaseName ? configObj.databaseName : ''
  firebirdPath = configObj.firebirdPath ? configObj.firebirdPath : firebirdDefaultPath

} else {

  console.log('Arquivo de configuração não encontrado!')

}




