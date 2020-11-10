import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
//import { connect } from 'http2';

@Entity()
export class Questions {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 1000 })
    text: string;

}