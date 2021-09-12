/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Feature } from "src/entities/Feature";
import { AlloweRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";
import { FeatureServices } from "src/services/feature/feature.service";

@Controller('api/feature')
@Crud({
    model: {
        type: Feature
    },
    params:{
        id: {
            field: 'featureId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{
             category:{ eager:true },
             articleFeatures:{eager:false },
             articles:{  eager:false }
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
export class FeatureControler{
    constructor( public service: FeatureServices) { } 
    
}