import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
    hello() {
        console.log('hello service');
    }
}
