import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // require to install 'class-validator' and 'class-transformer' lib's
  // using this you can  validate object's in the request
  app.useGlobalPipes(new ValidationPipe({
    // remove unused params in a request (example in this case: CreateMessageDto)
    whitelist: true,
    // return an error when the param in the request does not exist
    forbidNonWhitelisted: true,
    // try to transform params data types and dtos
    // transform: true,
  })); 
  
  await app.listen(3000);
}
bootstrap();
