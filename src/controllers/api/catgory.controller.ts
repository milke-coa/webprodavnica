/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Category } from "entities/Category";
import { query } from "express";
import { CategoryServices } from "src/services/category/category.service";

@Controller('api/category')
@Crud({
    model: {
        type: Category
    },
    params:{
        id: {
            field: 'categoryId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{
            categories:{
                eager:true
             },
             parentCategory:{
                 eager:false
             },
             features:{
                 eager:true
             },
             articles:{
                 eager:false
             }
            }
        }
    
})
export class CategoryControler{
    constructor( public service: CategoryServices) { } 
    
}