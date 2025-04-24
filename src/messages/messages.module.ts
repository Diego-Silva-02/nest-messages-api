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
    // using this you can create a dynamic module
    // MyDynamicModule.register({
    //   apiKey: 'Here comes the API KEY',
    //   apiUrl: 'http://shuashuashuashua.shua'
    // }),
  ],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    MessageUtils,

    // RegexFactory,
    // {
    //   provide: REMOVE_SPACES_REGEX, //token
    //   useFactory: (regexFactory: RegexFactory) => { // useFactory contains a function

    //     return regexFactory.create('RemoveSpacesRegex');
    //   },
    //   inject: [RegexFactory], // injecting in factory in order
    // },
    // {
    //   provide: ONLY_LOWERCASE_LETTERS_REGEX, //token
    //   // useFactory contains a function
    //   useFactory: async (regexFactory: RegexFactory) => {
    //     // async and await can be used like in this example
    //     // console.log('Awaiting promise.. .');
    //     // await new Promise(resolve => setTimeout(resolve, 3000));
    //     // console.log('Promise resolved');

    //     return regexFactory.create('OnlyLowercaseLettersRegex');
    //   },
    //   inject: [RegexFactory], // injecting in factory in order
    // },

    // { // this is the same thing to simple use [MessageUtils] on providers
    //   provide: MessageUtils, // Token
    //   useValue: new MessageUtilsMock(), // Value to be used
    //   // useClass: MessageUtils // Class
    // },

    // { // this is a different way to import. In this case, one constant
    //   provide: SERVER_NAME,
    //   useValue: 'My name is NestJS'
    // },
    // {
    //   provide: RegexProtocol, // provide can't be a interface
    //   useClass: 1 === 1 ? RemoveSpacesRegex : OnlyLowercaseLettersRegex
    //   // 1 === 1 it's the logic. Any others logics can be used
    // },
    // {
    //   provide: ONLY_LOWERCASE_LETTERS_REGEX,
    //   useClass: OnlyLowercaseLettersRegex
    // },
    // {
    //   provide: REMOVE_SPACES_REGEX,
    //   useClass: RemoveSpacesRegex
    // },
  ],
  // all that you export's in a module, you can use when you import this module
  exports: [MessageUtils]
})
export class MessagesModule {}
