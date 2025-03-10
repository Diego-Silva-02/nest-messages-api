import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
    private lastId = 1;
    private messages: Message[] = [
        {
            id: 1,
            text: 'This is a test message',
            from: 'Joana',
            to: 'João',
            read: false,
            date: new Date()
        }
    ];

    findAll(): Message[] {
        return this.messages;
    }

    findOne(id: string): Message {
        return this.messages.find(item => item.id === +id);
    }

    create(body: any) {
        this.lastId++;
        const id = this.lastId;
        const newMessage = {
            id,
            ...body
        }

        this.messages.push(newMessage);
    }

    update(id: string, body: any) {
        const messageIndex = this.messages.findIndex(item => item.id === +id);

        if (messageIndex) {
            const updatedMessage = this.messages[messageIndex];

            this.messages[messageIndex] = {
                ...updatedMessage,
                ...body
            }
        }
    }

    remove(id: string) {
        const messageIndex = this.messages.findIndex(item => item.id === +id);

        if (messageIndex) {
            this.messages.splice(messageIndex, 1);
        }
    }
}
