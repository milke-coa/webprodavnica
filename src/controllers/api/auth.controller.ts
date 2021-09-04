/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { LoginAdministratorDto } from "src/dtos/administrator/login.administrator.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as crypto from 'crypto';
import { LoginInfoAdministratorDto } from "src/dtos/administrator/login.info.administrator.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataAdministratorDto } from "src/dtos/administrator/jwt.data.administrator.dto";
import { Request } from "express";
import { jwtSecret } from "config/jwt.secret";
import { agent } from "supertest";
import { UserRegistrationDto } from "src/dtos/user/user.registratio. dto";
import { UserServices } from "src/services/user/user.service";

@Controller('auth')
export class AuthController{
    constructor (public administraorService: AdministratorService,
        public userService: UserServices
        ){}

    @Post('login') //http://localhost:3000/auth/login/
    async doLogin(@Body()data: LoginAdministratorDto, @Req()req:Request): Promise<ApiResponse | LoginInfoAdministratorDto> {

        const administrator = await this.administraorService.getByUserName(data.username);

        // early escape null se tretira kao negacija
        
        if(!administrator) {
            return  new Promise(resolve => resolve(new ApiResponse('error', -3001)));
        }
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

     if(administrator.passwordHash !== passwordHashString){
        return  new Promise(resolve =>resolve(new ApiResponse('error', -3002)));
                }      
    
        const jwtData = new JwtDataAdministratorDto();
        jwtData.aministratorId = administrator.administratorId;
        jwtData.username = administrator.username;
             
        let sada = new Date();
        sada.setDate(sada.getDate()+14); 
        const istekTimestamp = sada.getTime() / 1000;
        jwtData.exp =istekTimestamp;
             
        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"]

        let token:string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        const responsObject = new LoginInfoAdministratorDto(
        administrator.administratorId, 
        administrator.username, 
        token);

        return new Promise (resolve =>resolve(responsObject));

    }

    @Put('user/registration')
    async userRegistration(@Body() data:UserRegistrationDto){
        
        return await this.userService.register(data);

    }
}



// vratiti informacije o uspesnom logovanju nije isto sto i vratitir i podatke o korisniku
             // sta je ok vratiti 
             //username
             //administratorId
             //token (JWT)
             //NI SLUCAJNO PASSWORD
             // TAJNI KOD-sifra
             //JSOM {administratorID, username, exp, ip, ua}
             // Sifrovanje (TAJN SIFRA =>JSON  ) sifra binarni zapis -> BASE64
             // HEXstring