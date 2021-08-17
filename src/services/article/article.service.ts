import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { Article } from "entities/Article"
import { Repository } from "typeorm"

Injectable()
export class ArticleServices extends TypeOrmCrudService<Article> {
    constructor( @InjectRepository(Article)  private readonly article: Repository<Article> ){super(article) }
    //cim pomenete neki repizitorijum morate da ga evidentirate u vasm app modulu
}