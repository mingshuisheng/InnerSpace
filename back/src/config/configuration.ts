import { readFileSync } from 'fs';
// import {databaseConfigName} from "./DatabaseConfig";
import * as yaml from 'js-yaml';
// import { join } from 'path';

const YAML_CONFIG_FILENAME = './config.yaml';

export default () => {
  // return ({
  //   port: parseInt(process.env.PORT, 10) || 8080,
  //   [databaseConfigName]: {
  //     user: process.env.DATABASE_USER,
  //     password: process.env.DATABASE_PASSWORD,
  //     host: process.env.DATABASE_HOST,
  //     port: parseInt(process.env.DATABASE_PORT),
  //     database: process.env.DATABASE_DATABASE,
  //   }
  // })
  return yaml.load(
    readFileSync(YAML_CONFIG_FILENAME, 'utf8'),
  ) as Record<string, any>;
}
