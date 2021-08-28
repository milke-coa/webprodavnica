/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm"
import { Article } from "src/entities/Article"
import { ArticleFeature } from "src/entities/ArticleFeature"
import { ArticlePrice } from "src/entities/ArticlePrice"
import { AddArticleDto } from "src/dtos/article/add.article.dto"
import { ApiResponse } from "src/misc/api.response.class"
import { Repository } from "typeorm"

Injectable()
export class ArticleServices extends TypeOrmCrudService<Article> {
    constructor(
         @InjectRepository(Article) 
          private readonly article: Repository<Article>, 

          @InjectRepository(ArticlePrice) 
          private readonly articlePrice: Repository<ArticlePrice>, 

          @InjectRepository(ArticleFeature) 
          private readonly articleFeatures: Repository<ArticleFeature>,

    )
    {super(article); }
    //cim pomenete neki repizitorijum morate da ga evidentirate u vasm app modulu

    async creteFullArticle(data: AddArticleDto): Promise<Article | ApiResponse>{
         let newArticle: Article = new Article();
         newArticle.name       = data.name;
         newArticle.categoryId = data.categoryId;
         newArticle.excerpt    = data.excerpt;
         newArticle.description = data.description;

         let savedArticle = await this.article.save(newArticle);
         
         let newArticlePrice: ArticlePrice = new ArticlePrice();
         newArticlePrice.articleId = savedArticle.articleId;
         newArticlePrice.price = data.price;

         await this.articlePrice.save(newArticlePrice);
        
         for( let feature of data.features) {
            let newArticleFeature: ArticleFeature = new ArticleFeature();
            newArticleFeature.articleId = savedArticle.articleId;
            newArticleFeature.articleFeatureId = feature.featureId;
            newArticleFeature.value       =   feature.value;

            await this.articleFeatures.save(newArticleFeature);
        }
            return await this.article.findOne(savedArticle.articleId,{
                relations:[
                    "category",
                     "articleFeatures",
                     "features",
                     "articlePrices"
                ]
            })
    }

}
function ArticleFeture(ArticleFeture: any) {
    throw new Error("Function not implemented.")
}
