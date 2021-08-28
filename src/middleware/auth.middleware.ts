/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { JwtDataAdministratorDto } from "src/dtos/administrator/jwt.data.administrator.dto";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as jwt from "jsonwebtoken";
import { jwtSecret } from "config/jwt.secret";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor( private readonly administratorService: AdministratorService){ }
  
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

    let jwtData: JwtDataAdministratorDto;

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

        const administrator = await this.administratorService.getById(jwtData.aministratorId);
    if(!administrator)    {
        throw new HttpException('Acount not found', HttpStatus.UNAUTHORIZED);
    }

    const trenutniTmeStamp = new Date().getTime()/1000;

    if(trenutniTmeStamp >= jwtData.exp){
        throw new HttpException('The token has expired', HttpStatus.UNAUTHORIZED);

    }
     next();
          
  }

}