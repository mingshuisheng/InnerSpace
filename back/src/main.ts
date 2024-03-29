import { NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())

  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>('app.port'), '::')

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().then(null)
