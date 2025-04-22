import { forwardRef, Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { PeopleModule } from 'src/people/people.module';
import { MessageUtils } from './message.utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    forwardRef(() => PeopleModule),
  ],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    {
      provide: MessageUtils, // this is the same thing to simple use [MessageUtils] on providers
      useClass: MessageUtils
    },
  ],
  // all that you export's in a module, you can use when you import this module
  exports: [
    {
      provide: MessageUtils, // this is the same thing to simple use [MessageUtils] on exports
      useClass: MessageUtils
    }
  ]
})
export class MessagesModule {}
