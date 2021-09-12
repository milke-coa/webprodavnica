/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { Administrator } from "src/entities/Administrator";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { AlloweRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckerGuard } from "src/misc/role.checker.guard";

@Controller('api/administrator')
export class AdministratorControler{
    constructor(
        private administartorService: AdministratorService
    ){ }

    //Get http://localhost:3000/api/administrator
    @Get()
    @UseGuards(RoleCheckerGuard)
    @AlloweRoles('administrator')
    getAll(): Promise<Administrator[]>{
    return this.administartorService.getAll();  
  }
     //Get http://localhost:3000/api/administrator
    @Get(':id')
    @UseGuards(RoleCheckerGuard)
    @AlloweRoles('administrator')
    getById(@Param('id') administratorId:number): Promise<Administrator | ApiResponse>{
       
        return new Promise(async (resolve) => {
        
          let admin = await this.administartorService.getById(administratorId);
           
          if(admin === undefined){
            resolve(new ApiResponse("error",-1002));
          }

          resolve(admin)
            
        });
  }
   //Post http://localhost:3000/api/administrator
   
   @Post()
   @UseGuards(RoleCheckerGuard)
   @AlloweRoles('administrator')
   add(@Body() data:AddAdministratorDto): Promise<Administrator|ApiResponse>{
     return this.administartorService.add(data);
   
   }

    //Patch http://localhost:3000/api/administrator/4
   
    @Patch(':id')
    @UseGuards(RoleCheckerGuard)
    @AlloweRoles('administrator')
    edit(@Param('id')id:number, @Body() data:EditAdministratorDto): Promise<Administrator |ApiResponse>{
     
        return this.administartorService.editByID(id, data);
    
    }
    

}
