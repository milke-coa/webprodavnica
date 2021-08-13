/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'entiteti/administrator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator)
        private readonly adminstrator: Repository<Administrator>,   
    ){}

    getAll(): Promise<Administrator[]>{
        return this.adminstrator.find();    
    }

    getById(id: number): Promise<Administrator>{
        return this.adminstrator.findOne(id);
    }
}
