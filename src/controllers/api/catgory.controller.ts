/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Category } from "src/entities/Category";
import { CategoryServices } from "src/services/category/category.service";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { AlloweRoles } from "src/misc/allow.to.roles.descriptor";

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
            features:{
                eager:true
            },
             parentCategory:{
                 eager:false
             },
             articles:{
                 eager:false
             }
            }
        },
        routes:{
            only:[
                "createOneBase",
                "createManyBase",
                "updateOneBase",
                "getManyBase",
                "getOneBase"
            ],
            createOneBase:{
                decorators:[
                    UseGuards(RoleCheckerGuard),
                    AlloweRoles('administrator')
                ]
            },
            createManyBase:{
                decorators:[
                    UseGuards(RoleCheckerGuard),
                    AlloweRoles('administrator')
                ]
            },
            updateOneBase:{
                decorators:[
                    UseGuards(RoleCheckerGuard),
                    AlloweRoles('administrator')
                ]
            },
            getManyBase:{
                decorators:[
                    UseGuards(RoleCheckerGuard),
                    AlloweRoles('administrator', 'user')
                ]
            },
            getOneBase:{
                decorators:[
                    UseGuards(RoleCheckerGuard),
                    AlloweRoles('administrator', 'user')
                ]
            },
            
        }
    
})
export class CategoryControler{
    constructor( public service: CategoryServices) { } 
    
}