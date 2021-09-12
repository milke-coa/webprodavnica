/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as jwt from "jsonwebtoken";
import { jwtSecret } from "config/jwt.secret";
import { UserServices } from "src/services/user/user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor( private readonly administratorService: AdministratorService,
        private readonly userService: UserServices){ }
  
    async use(req: Request, res: Response, next: NextFunction) {

        const token = req.headers.authorization;

        const tokenParts = token.split(' ');
        if(tokenParts.length !==2){
            throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }
        const tokenString = tokenParts[1];
      
        if(!tokenString){
            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
        }

    let jwtData: JwtDataDto;

      try{jwtData = jwt.verify(tokenString,jwtSecret)as any;
      } catch(e){
        throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        // ne treba naspisati istinu zbg napadaca
      }
  
    if(!jwtData) {
        throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

    if(jwtData.ip !== req.ip.toString()){
        throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
       }
    if(jwtData.ua !== req.headers["user-agent"])  {
        throw new HttpException('Bad token found', HttpStatus.UNAUTHORIZED);
        }

    if(jwtData.role==="administrator"){
     const administrator = await this.administratorService.getById(jwtData.id);
    
     if(!administrator)    {
        throw new HttpException('Acount not found', HttpStatus.UNAUTHORIZED);
    }
        } else{
            const user = await this.userService.getById(jwtData.id);
    
     if(!user)    {
        throw new HttpException('Acount not found', HttpStatus.UNAUTHORIZED);
    }

        }

    const trenutniTmeStamp = new Date().getTime()/1000;

    if(trenutniTmeStamp >= jwtData.exp){
        throw new HttpException('The token has expired', HttpStatus.UNAUTHORIZED);

    }

    req.token =jwtData;
     next();
          
  }

}