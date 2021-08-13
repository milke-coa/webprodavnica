/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Adminitrator {
        @PrimaryGeneratedColumn({name: 'administartor_id', type: 'int', unsigned:true })
        administartorId: number;

        @Column({type:'varchar', length:'32', unique:true})
        username: string;

        @Column({name:'password_hash', type:'varchar', length:'128'})
        passwordHash: string;
}