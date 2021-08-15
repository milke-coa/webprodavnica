/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Administrator } from "entities/Administrator";
import { AddAdministratorDto } from "src/dtos/administrator/add.admnistrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { AdministratorService } from "src/services/administrator/administrator.service";

@Controller('api/administrator')
export class AdministratorControler{
    constructor(
        private administartorService: AdministratorService
    ){ }

    //Get http://localhost:3000/api/administrator
    @Get()
    getAll(): Promise<Administrator[]>{
    return this.administartorService.getAll();  
  }
     //Get http://localhost:3000/api/administrator
    @Get(':id')
    getById(@Param('id') administratorId:number): Promise<Administrator>{
     return this.administartorService.getById(administratorId);  
}
   //Put http://localhost:3000/api/administrator
   
   @Put()
   add(@Body() data:AddAdministratorDto): Promise<Administrator>{
     return this.administartorService.add(data);
   
   }

    //post http://localhost:3000/api/administrator/4
   
    @Post(':id')
    edit(@Param('id')id:number, @Body() data:EditAdministratorDto): Promise<Administrator>{
     
        return this.administartorService.editByID(id,data);
    
    }
    

}
