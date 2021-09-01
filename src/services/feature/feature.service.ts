import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Feature } from "src/entities/Feature";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class FeatureServices extends TypeOrmCrudService<Feature> {
    constructor( @InjectRepository(Feature)  private readonly feature: Repository<Feature> ){super(feature) }
    //cim pomenete neki repizitorijum morate da ga evidentirate u vasm app modulu
}


