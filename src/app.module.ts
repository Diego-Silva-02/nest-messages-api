import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from './people/people.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import appConfig from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forFeature(appConfig),
    // inside forRoot
    // { // config module give permission to use .env
    //   validationSchema: Joi.object({ //used to validate configs from .env
    //     DATABASE_TYPE: Joi.required(),
    //     DATABASE_HOST: Joi.required(),
    //     DATABASE_PORT: Joi.number().default(5432),
    //     DATABASE_USERNAME: Joi.required(),
    //     DATABASE_DATABASE: Joi.required(),
    //     DATABASE_PASSWORD: Joi.required(),
    //     DATABASE_AUTOLOADENTITIES: Joi.number().min(0).max(1).default(0),
    //     DATABASE_SYNCHRONIZE: Joi.number().min(0).max(1).default(0),
    //   }),
    // }
    
    TypeOrmModule.forRootAsync({ // to use app.config.ts configurations
      imports: [ConfigModule.forFeature(appConfig)], // forFeature to use things partially
      inject: [appConfig.KEY],
      useFactory: async (appConfigurations: ConfigType<typeof appConfig>) => {
        return {
          type: appConfigurations.database.type,
          host: appConfigurations.database.host,
          port: appConfigurations.database.port,
          username: appConfigurations.database.username,
          database: appConfigurations.database.database,
          password: appConfigurations.database.password,
          autoLoadEntities: appConfigurations.database.autoLoadEntities,
          synchronize: appConfigurations.database.synchronize,
        };
      },
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
