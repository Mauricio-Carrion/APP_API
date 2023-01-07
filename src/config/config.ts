export default class Config {
  configJson: any
  database: string
  databaseName: string
  firebirdPath: string
  firebirdDefaultPath: string
  host: string
  mySqlPort: number
  firebirdPort: number
  configFile: string

  static converteJson: any

  constructor() {
    this.configJson = null
    this.configFile = `${__dirname}/config.json`
    this.database = this.configJson.database
    this.databaseName = this.configJson.databaseName
    this.firebirdPath = this.configJson.firebirdPath
    this.firebirdDefaultPath = 'C://JF System//Estoque//Dados//JFC.FDB'
    this.host = '127.0.0.1'
    this.mySqlPort = 3306
    this.firebirdPort = 3050
    this.converteConfigJson()
  }

  converteConfigJson(): void {
    let configObj = JSON.parse(this.configFile)
    this.configJson = configObj
  }

  get
}
    





