import configData from './config.json'
export default class Config {
  private configJson: any
  private database: string
  private databaseName: string
  private firebirdPath: string
  private firebirdDefaultPath: string
  private host: string
  private mySqlPort: number
  private firebirdPort: number

  constructor() {
    this.configJson = configData
    this.firebirdDefaultPath = 'C://JF System//Estoque//Dados//JFC.FDB'
    this.database = this.configJson.database
    this.databaseName = this.configJson.databaseName
    this.firebirdPath = this.configJson.firebirdPath ? this.configJson.firebirdPath : this.firebirdDefaultPath
    this.host = '127.0.0.1'
    this.mySqlPort = 3306
    this.firebirdPort = 3050
  }

  get db() {
    return this.database
  }

  get dbName() {
    return this.databaseName
  }

  get fbPath() {
    return this.firebirdPath
  }

  get dbhost() {
    return this.host
  }

  get mysqlPort() {
    return this.mySqlPort
  }

  get fbPort() {
    return this.firebirdPort
  }
}