import { forwardRef, Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { PeopleModule } from 'src/people/people.module';
import { MessageUtils, MessageUtilsMock } from './message.utils';
import { RemoveSpacesRegex } from 'src/common/regex/remove-spaces.regex';
import { OnlyLowercaseLettersRegex } from 'src/common/regex/only-lowercase-letters.regex';
import { ONLY_LOWERCASE_LETTERS_REGEX, REMOVE_SPACES_REGEX, SERVER_NAME } from './messages.constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    forwardRef(() => PeopleModule),
  ],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    { // this is the same thing to simple use [MessageUtils] on providers
      provide: MessageUtils, // Token
      useValue: new MessageUtilsMock(), // Value to be used
      // useClass: MessageUtils // Class
    },
    { // this is a different way to import. In this case, one constant
      provide: SERVER_NAME,
      useValue: 'My name is NestJS'
    },
    // {
    //   provide: RegexProtocol, // provide can't be a interface
    //   useClass: 1 === 1 ? RemoveSpacesRegex : OnlyLowercaseLettersRegex
    //   // 1 === 1 it's the logic. Any others logics can be used
    // },
    {
      provide: ONLY_LOWERCASE_LETTERS_REGEX,
      useClass: OnlyLowercaseLettersRegex
    },
    {
      provide: REMOVE_SPACES_REGEX,
      useClass: RemoveSpacesRegex
    },
  ],
  // all that you export's in a module, you can use when you import this module
  exports: [MessageUtils]
})
export class MessagesModule {}
