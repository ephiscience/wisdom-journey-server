import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
//import { connect } from 'http2';
import { ObjectType, Field, ID, Int } from "type-graphql";

@Entity()
@ObjectType()
export class Questions {
    @Field(() => ID)  
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column("varchar", { length: 1000 })
    text: string;

}