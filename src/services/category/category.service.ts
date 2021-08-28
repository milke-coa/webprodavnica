import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Category } from "src/entities/Category";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CategoryServices extends TypeOrmCrudService<Category> {
    constructor( @InjectRepository(Category)  private readonly category: Repository<Category> ){super(category) }
    //cim pomenete neki repizitorijum morate da ga evidentirate u vasm app modulu
}


