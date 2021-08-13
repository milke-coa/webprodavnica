import { Controller, Get } from '@nestjs/common';
import { Administrator } from 'entities/Administrator';
import { AdministratorService } from './services/administrator/administrator.service';

@Controller()
export class AppController {
  constructor(private administratorService: AdministratorService) {}
  @Get()
  getHello(): string {
    return 'Hello world';
  }
  @Get('api/administrator')
  getAllAdnins(): Promise<Administrator[]>{
    return this.administratorService.getAll();
    
  }

}
