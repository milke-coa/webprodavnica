
import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database';
import { AdministratorService } from './services/administrator/administrator.service';
import { Administrator } from 'entities/Administrator';
import { Article } from 'entities/Article';
import { ArticleFeature } from 'entities/ArticleFeature';
import { ArticlePrice } from 'entities/ArticlePrice';
import { Cart } from 'entities/Cart';
import { CartArticle } from 'entities/CartArticle';
import { Category } from 'entities/Category';
import { Feature } from 'entities/Feature';
import { Photo } from 'entities/Photo';
import { Order } from 'entities/Order';
import { User } from 'entities/User';

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
    TypeOrmModule.forFeature([Administrator])
    
  ],
  controllers: [AppController],
  providers: [AdministratorService],
})
export class AppModule {}
