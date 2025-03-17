import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

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

    throwNotFoundError() {
        // throw new HttpException('Message not found.', HttpStatus.NOT_FOUND);
        throw new NotFoundException('Message not found.');
    }
    

    findAll(): Message[] {
        return this.messages;
    }

    findOne(id: string): Message {
        const message = this.messages.find(item => item.id === +id);

        if (message)
            return message;

        this.throwNotFoundError();
    }

    create(createMessageDto: CreateMessageDto): Message {
        this.lastId++;
        const id = this.lastId;
        const newMessage: Message = {
            id,
            ...createMessageDto,
            read: false,
            date: new Date()
        }

        this.messages.push(newMessage);

        return newMessage;
    }

    update(id: string, updateMessageDto: UpdateMessageDto): Message {
        const messageIndex = this.messages.findIndex(item => item.id === +id);

        if(messageIndex < 0) {
            this.throwNotFoundError();
        }

        const updatedMessage = this.messages[messageIndex];

        this.messages[messageIndex] = {
            ...updatedMessage,
            ...updateMessageDto
        }

        return this.messages[messageIndex];
    }

    remove(id: string) {
        const messageIndex = this.messages.findIndex(item => item.id === +id);

        if(messageIndex < 0) {
            this.throwNotFoundError();
        }

        const message = this.messages[messageIndex];
        this.messages.splice(messageIndex, 1);

        return message;
    }
}
