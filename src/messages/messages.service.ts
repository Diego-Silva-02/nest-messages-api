import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleService } from 'src/people/people.service';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>, // this declarator gives repository acess
        private readonly peopleService: PeopleService
    ) { }

    throwNotFoundError() {
        // throw new HttpException('Message not found.', HttpStatus.NOT_FOUND);
        throw new NotFoundException('Message not found.');
    }
    

    async findAll(): Promise<Message[]> {
        const messages = await this.messageRepository.find({
            relations: ['from', 'to'], // informs the variables that have relationships so that they appear in the return
            order: {
                id: 'desc'
            },
            select: { // see how get only id and name
                from: true,
                to: true,
            }
        });
        return messages;
    }

    async findOne(id: number): Promise<Message> {
        const message = await this.messageRepository.findOne({
            where: {
                id, // id: id
            },
            relations: ['from', 'to'], // informs the variables that have relationships so that they appear in the return
            select: { // see how get only id and name
                from: true,
                to: true,
            }
        })

        if (message)
            return message;

        this.throwNotFoundError();
    }

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
        const { fromId, toId } = createMessageDto;
        // find person who is creating the message
        const from = await this.peopleService.findOne(fromId);
        
        // find person who the message will be sent
        const to = await this.peopleService.findOne(toId);

        const newMessage = {
            text: createMessageDto.text,
            from: from.id.toString(),
            to: to.id.toString(),
            read: false,
            date: new Date()
        }

        const message = await this.messageRepository.create(newMessage);

        return this.messageRepository.save(message);
    }

    async update(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
        const partialUpdateMessageDto = {
            read: updateMessageDto?.read,
            text: updateMessageDto?.text
        }
        const message = await this.messageRepository.preload({ // find object and update
            id,
            ...partialUpdateMessageDto
        });
        
        if(!message) this.throwNotFoundError();

        return this.messageRepository.save(message);
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
