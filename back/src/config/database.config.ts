import {ConfigService} from "@nestjs/config";

export interface DatabaseConfig {
  user: string
  password: string
  host: string
  port: number
  database: string
}

export const databaseConfigName = "database"

export const getDataBaseConfig = (configService: ConfigService): DatabaseConfig => {
  const databaseConfig = configService.get<DatabaseConfig>(databaseConfigName)
  if (configService.get<string>("DATABASE_USER")) {
    databaseConfig.user = configService.get<string>("DATABASE_USER")
  }

  if (configService.get<string>("DATABASE_PASSWORD")) {
    databaseConfig.password = configService.get<string>("DATABASE_PASSWORD")
  }

  if (configService.get<string>("DATABASE_HOST")) {
    databaseConfig.host = configService.get<string>("DATABASE_HOST")
  }

  if (configService.get<string>("DATABASE_PORT")) {
    databaseConfig.port = parseInt(configService.get<string>("DATABASE_PORT"))
  }

  if (configService.get<string>("DATABASE_DATABASE")) {
    databaseConfig.database = configService.get<string>("DATABASE_DATABASE")
  }


  return databaseConfig
}
