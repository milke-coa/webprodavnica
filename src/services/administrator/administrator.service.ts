/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Adminitrator } from 'entiteti/administrator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Adminitrator)
        private readonly adminstrator: Repository<Adminitrator>,   
    ){}

    getAll(): Promise<Adminitrator[]>{
        return this.adminstrator.find();    
    }

    getById(id: number): Promise<Adminitrator>{
        return this.adminstrator.findOne(id);
    }
}
