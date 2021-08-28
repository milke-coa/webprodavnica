
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database';
import { AdministratorService } from './services/administrator/administrator.service';
import { Administrator } from 'src/entities/Administrator';
import { Article } from 'src/entities/Article';
import { ArticleFeature } from 'src/entities/ArticleFeature';
import { ArticlePrice } from 'src/entities/ArticlePrice';
import { Cart } from 'src/entities/Cart';
import { CartArticle } from 'src/entities/CartArticle';
import { Category } from 'src/entities/Category';
import { Feature } from 'src/entities/Feature';
import { Photo } from 'src/entities/Photo';
import { Order } from 'src/entities/Order';
import { User } from 'src/entities/User';
import { AdministratorControler } from './controllers/api/administrator.controler';
import { CategoryControler } from './controllers/api/catgory.controller';
import { CategoryServices } from './services/category/category.service';
import { ArticleServices } from './services/article/article.service';
import { ArticleControler } from './controllers/api/article.controler';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PhotoServices } from './services/photo/photo.services';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3307,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [
        Administrator,
        Article,
        ArticleFeature,
        ArticlePrice,
        Cart,
        CartArticle,
        Category,
        Feature,
        Order,
        Photo,
        User
       ]

    }),
    TypeOrmModule.forFeature([
      Administrator,
      Category,
      Article,
      ArticlePrice,
      ArticleFeature,
      ArticlePrice,
        Cart,
        CartArticle,
        Category,
        Feature,
        Order,
        Photo,
        User
    
    ])
    
  ],
  controllers: [
    AppController,
    AdministratorControler,
    CategoryControler,
    ArticleControler,
    AuthController// autorizacija
  
  ],
  providers: [
    AdministratorService,
    CategoryServices,
    ArticleServices,
    PhotoServices
  ],
  exports:[
    AdministratorService,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
     consumer
     .apply(AuthMiddleware)
     .exclude('auth/*')
     .forRoutes('api/*');

  }
  
}
