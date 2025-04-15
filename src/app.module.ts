import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from './people/people.module';
import { APP_FILTER } from '@nestjs/core';
import { MyExceptionFilter } from './common/filters/my-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({ // settings for database connections
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      database: 'postgres',
      password: '123456',
      autoLoadEntities: true, // Load entities without need especify
      synchronize: true, // Syncronize with DB. This shoud not be used in production
    }),
    MessagesModule,
    PeopleModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,        // using this, will not necessary use new,
      useClass: MyExceptionFilter // and will stay using dependency injection
    }
  ],
})
export class AppModule {}
// to implement a Middleware use this
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(SimpleMiddleware, AnotherMiddleware).forRoutes({
//       path: 'messages', // * -> all path's
//       method: RequestMethod.ALL // to all type of method's
//     });
//   }
// }
