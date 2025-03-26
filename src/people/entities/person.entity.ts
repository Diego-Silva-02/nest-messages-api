import { IsEmail } from "class-validator";
import { Message } from "src/messages/entities/message.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsEmail()
    email: string;
    
    @Column({ length: 255 })
    passwordHash: string;
    
    @Column({ length: 100 })
    name: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    // One person can send a lot of messages
    // Field from Message that will be caught
    @OneToMany(() => Message, message => message.from)
    sentMessages: Message[];

    // One person can received a lot of messages
    // Field from Message that will be caught
    @OneToMany(() => Message, message => message.to)
    receivedMessages: Message[];
}
