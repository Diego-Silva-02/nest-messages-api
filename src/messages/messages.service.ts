import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>, // this declarator gives repository acess
    ) {
        
    }

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
    

    async findAll(): Promise<Message[]> {
        const messages = await this.messageRepository.find();
        return messages;
    }

    async findOne(id: number): Promise<Message> {
        const message = await this.messageRepository.findOne({
            where: {
                id, // id: id
            }
        })

        if (message)
            return message;

        this.throwNotFoundError();
    }

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
        const newMessage = {
            ...createMessageDto,
            read: false,
            date: new Date()
        }

        const message = await this.messageRepository.create(newMessage);

        return this.messageRepository.save(message);
    }

    update(id: number, updateMessageDto: UpdateMessageDto): Message {
        const messageIndex = this.messages.findIndex(item => item.id === id);

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

    async remove(id: number): Promise<Message> {
        const message = await this.messageRepository.findOneBy({
            id
        });

        if(!message) {
            this.throwNotFoundError();
        }

        return this.messageRepository.remove(message);
    }
}
