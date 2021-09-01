/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Feature } from "src/entities/Feature";
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
            category:{
                eager:true
             },
             articleFeatures:{
                 eager:false
             },
            articles:{
                eager:false
             }
            }
        }
    
})
export class FeatureControler{
    constructor( public service: FeatureServices) { } 
    
}