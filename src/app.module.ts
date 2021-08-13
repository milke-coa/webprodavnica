/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database';
import { Adminitrator } from 'entiteti/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3307,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [Adminitrator ]

    }),
    TypeOrmModule.forFeature([Adminitrator])
    
  ],
  controllers: [AppController],
  providers: [AdministratorService],
})
export class AppModule {}
