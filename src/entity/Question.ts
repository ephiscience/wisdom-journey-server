import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Question {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column('varchar', {length: 1000})
    text: string;

}
