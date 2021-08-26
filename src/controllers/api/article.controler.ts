/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Article } from "entities/Article";
import { AddArticleDto } from "src/dtos/article/add.article.dto";
import { ArticleServices } from "src/services/article/article.service";
@Controller('api/article')
@Crud({
    model: {
        type: Article
    },
    params:{
        id: {
            field: 'articleId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{  
             category:{ eager:true
                },
             photos:{eager:true
                 },
             articlePrices:{ eager:true
                },
             articleFeature:{ eager:true
                },
                features:{ eager:true
                }

            }
        }
    
})

export class ArticleControler{
    constructor( public service: ArticleServices) { } 

    @Post('creteFull')
    creteFullArticle(@Body() data:AddArticleDto){
        return this.service.creteFullArticle(data);
    }
    
}