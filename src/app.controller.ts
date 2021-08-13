/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { Adminitrator } from 'entiteti/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';


@Controller()
export class AppController {
  constructor(private administratorService: AdministratorService) {}
  @Get()
  getHello(): string {
    return 'Hello world';
  }
  @Get('api/administrator')
  getAllAdnins(): Promise<Adminitrator[]>{
    return this.administratorService.getAll();
    
  }

}
