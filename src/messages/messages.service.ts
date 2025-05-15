import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleService } from 'src/people/people.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

// Scope.DEFAULT -> The provider is a singleton
    // Always that you use this class, you will use the same instance
    // Giving permission to you use the state from the application
// Scope.REQUEST -> The provider is instantiated on each request
// Scope.TRANSIENT -> Create a different instance from this provider to each class that use this provider

@Injectable({ scope: Scope.DEFAULT })
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>, // this declarator gives repository acess
        private readonly peopleService: PeopleService,

        // you can use ConfigService to get values from .env using nestjs
        // private readonly configService: ConfigService,

        // @Inject(SERVER_NAME) // use this to import a constant 
        // private readonly serverName: string,
    ) { }
    // to get .env values using nestjs
    // const databaseUsername = this.configService.get<string>('DATABASE_USERNAME');
    // console.log({databaseUsername});

    throwNotFoundError() {
        // throw new HttpException('Message not found.', HttpStatus.NOT_FOUND);
        throw new NotFoundException('Message not found.');
    }
    

    async findAll(paginationDto?: PaginationDto): Promise<Message[]> {
        const { limit = 10, offset = 0 } = paginationDto; 

        // console.log(this.serverName);

        // const messages = await this.messageRepository.find({
        //     relations: ['from', 'to'], // informs the variables that have relationships so that they appear in the return
        //     order: {
        //         id: 'desc'
        //     },
        //     select: { // see how get only id and name
        //         from: true,
        //         to: true,
        //     }
        // });
        // return messages;

        // to filter only fields from 'from' and 'to' use query builder, like in this example
        const messages = await this.messageRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.from', 'from')
            .leftJoinAndSelect('message.to', 'to')
            .select([
                'message.id',
                'message.text',
                'message.read',
                'message.date',
                'message.createdAt',
                'message.updatedAt',
                'from.id',
                'from.name',
                'to.id',
                'to.name'
            ])
            .orderBy('message.id', 'DESC')
            .take(limit) // how many entities will take (per page)
            .skip(offset) // // how many entities will skip
            .getMany();
        
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
        const message = await this.findOne(id);
        
        message.text = updateMessageDto?.text ?? message.text;
        message.read = updateMessageDto?.read ?? message.read;
        
        this.messageRepository.save(message);

        return message;
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
