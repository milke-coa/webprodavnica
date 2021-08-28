import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get() // GET http://localhost:3000/
  getHello(): string {
    return 'Hello world';
  } 

}
