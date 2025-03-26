import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from './people/people.module';

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
  providers: [AppService],
})
export class AppModule {}
