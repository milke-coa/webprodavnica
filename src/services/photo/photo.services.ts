import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm/lib/typeorm-crud.service";
import { Photo } from "src/entities/Photo";
import { Repository } from "typeorm";

Injectable()
export class PhotoServices extends TypeOrmCrudService<Photo> {
    constructor( @InjectRepository(Photo)  private readonly photo: Repository<Photo>){
          super(photo); 
}
    add(newPhoto:Photo): Promise<Photo> {
        return this.photo.save(newPhoto);       
    }
    async deleteById(id: number){
        return await this.photo.delete(id);
    }
}

    //cim pomenete neki repizitorijum morate da ga evidentirate u vasm app modulu