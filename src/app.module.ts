import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from './people/people.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({ // config module give permission to use .env
      validationSchema: Joi.object({ //used to validate configs from .env
        DATABASE_TYPE: Joi.required(),
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USERNAME: Joi.required(),
        DATABASE_DATABASE: Joi.required(),
        DATABASE_PASSWORD: Joi.required(),
        DATABASE_AUTOLOADENTITIES: Joi.number().min(0).max(1).default(0),
        DATABASE_SYNCHRONIZE: Joi.number().min(0).max(1).default(0),
      }),
    }),
    TypeOrmModule.forRoot({ // settings for database connections
      type: process.env.DATABASE_TYPE as 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT, // + converts to number
      username: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_DATABASE,
      password: process.env.DATABASE_PASSWORD,
      autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES), // Load entities without need especify // 1 === true
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE), // Syncronize with DB. This shoud not be used in production
    }),
    MessagesModule,
    PeopleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,        // using this, will not necessary use new,
    //   useClass: MyExceptionFilter // and will stay using dependency injection
    // },                            // To use this, it's necessary to use @Injection in class
    // {
    //   provide: APP_GUARD,    // using this, will not necessary use new,
    //   useClass: IsAdminGuard // and will stay using dependency injection
    // }                        // To use this, it's necessary to use @Injection in class
  ],
})
export class AppModule { }
// constructor() { // in class AppModule
//   console.log(process.env.ESSA_E_UMA_VARIAVEL_1); // process.env -> variable to acess .env
//   console.log(process.env.ESSA_E_UMA_VARIAVEL_2);
// }

// to implement a Middleware use this
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(SimpleMiddleware, AnotherMiddleware).forRoutes({
//       path: 'messages', // * -> all path's
//       method: RequestMethod.ALL // to all type of method's
//     });
//   }
// }
