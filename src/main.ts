import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // require to install 'class-validator' and 'class-transformer' lib's
  // using this you can  validate object's in the request
  app.useGlobalPipes(new ValidationPipe()); 
  
  await app.listen(3000);
}
bootstrap();
