/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { LoginAdministratorDto } from "src/dtos/administrator/login.administrator.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { AdministratorService } from "src/services/administrator/administrator.service";
import * as crypto from 'crypto';
import { LoginInfoDto } from "src/dtos/auth/login.info.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataDto } from "src/dtos/auth/jwt.data.dto";
import { Request } from "express";
import { jwtSecret } from "config/jwt.secret";
import { UserRegistrationDto } from "src/dtos/user/user.registratio. dto";
import { UserServices } from "src/services/user/user.service";
import { LoginUserDto } from "src/dtos/user/login.user.dto";

@Controller('auth')
export class AuthController{
    constructor (public administraorService: AdministratorService,
        public userService: UserServices
        ){}

    @Post('admin/login') //http://localhost:3000/auth/admin/login/
    async doAdminLogin(@Body()data: LoginAdministratorDto, @Req()req:Request): Promise<ApiResponse | LoginInfoDto> {

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
    
        const jwtData = new JwtDataDto();
        jwtData.role = "administrator";
        jwtData.id = administrator.administratorId;
        jwtData.indentity = administrator.username;
             
        let sada = new Date();
        sada.setDate(sada.getDate()+14); 
        const istekTimestamp = sada.getTime() / 1000;
        jwtData.exp =istekTimestamp;
             
        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"]

        let token:string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        const responsObject = new LoginInfoDto(
        administrator.administratorId, 
        administrator.username, 
        token);

        return new Promise (resolve =>resolve(responsObject));

    }

    @Put('user/registration')
    async serRegistration(@Body() data:UserRegistrationDto){
        
        return await this.userService.register(data);
    }
    @Post('user/login') //http://localhost:3000/auth/admin/login/
    async doUserLogin(@Body()data: LoginUserDto, @Req()req:Request): Promise<ApiResponse | LoginInfoDto> {

        const user = await this.userService.getByEmail(data.email);

        // early escape null se tretira kao negacija
        
        if(!user) {
            return  new Promise(resolve => resolve(new ApiResponse('error', -3001)));
        }
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

     if(user.passwordHash !== passwordHashString){
        return  new Promise(resolve =>resolve(new ApiResponse('error', -3002)));
                }      
    
        const jwtData = new JwtDataDto();
        jwtData.role = "user";
        jwtData.id = user.userId;
        jwtData.indentity = user.email;
             
        let sada = new Date();
        sada.setDate(sada.getDate()+14); 
        const istekTimestamp = sada.getTime() / 1000;
        jwtData.exp =istekTimestamp;
             
        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"]

        let token:string = jwt.sign(jwtData.toPlainObject(), jwtSecret);

        const responsObject = new LoginInfoDto(
        user.userId, 
        user.email, 
        token);

        return new Promise (resolve =>resolve(responsObject));

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