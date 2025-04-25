import { ConflictException, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';

@Injectable({ scope: Scope.DEFAULT })
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) { }

  throwNotFoundError() {
    throw new NotFoundException('Person not found.');
  }

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    try {
      const personData = {
        name: createPersonDto?.name,
        passwordHash: createPersonDto?.password,
        email: createPersonDto?.email
      };
  
      const newPerson = this.personRepository.create(personData);
      await this.personRepository.save(newPerson);
  
      return newPerson;
    } catch (error) {
      if(error.code === '23505') { // unique key already exists (duplicate key)
        throw new ConflictException('The E-mail is already registered!');
      } 

      throw error;
    }
  }

  async findAll(): Promise<Person[]> {
    const people = await this.personRepository.find({
      order: {
        id: 'desc',
      },
    });
    return people;
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: {
        id
      },
    });

    if (person)
      return person;

    this.throwNotFoundError();
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const updatePersonData = {
      passwordHash: updatePersonDto?.password,
      name: updatePersonDto?.name
    };

    const person = await this.personRepository.preload({
      id,
      ...updatePersonData
    });

    if(!person) this.throwNotFoundError();

    return this.personRepository.save(person);
  }

  async remove(id: number): Promise<Person> {
    const person = await this.personRepository.findOneBy({ id });

    if (!person)
      this.throwNotFoundError();
      
    return this.personRepository.remove(person);
  }
}
