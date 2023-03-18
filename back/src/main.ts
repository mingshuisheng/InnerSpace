import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>('app.port'), '0.0.0.0')

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().then(null)
