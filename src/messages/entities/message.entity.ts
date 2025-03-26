import { Person } from "src/people/entities/person.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    text: string;

    @Column({ default: false })
    read: boolean;
    
    @Column()
    date: Date;
    
    @CreateDateColumn()
    createdAt?: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;
    
    // @ManyToOne() //Many of this entity can have this same variable value
    // In this case, many message can be sent from this same person
    @ManyToOne(() => Person)
    // Especify column "from" that save Person.id from the person that send the message
    @JoinColumn({ name: 'from' })
    from: string;
    
    // @ManyToOne() //Many of this entity can have this same variable value
    // In this case, many message can be sent to this same person
    @ManyToOne(() => Person)
    // Especify column "to" that save Person.id from the person that send the message
    @JoinColumn({ name: 'to' })
    to: string;
}
