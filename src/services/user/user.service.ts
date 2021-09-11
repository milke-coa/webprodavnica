import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { User } from "src/entities/User";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegistrationDto } from "src/dtos/user/user.registratio. dto";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from 'crypto'; 



@Injectable()
export class UserServices extends TypeOrmCrudService<User> {
    constructor( @InjectRepository(User) 
     private readonly user: Repository<User> ){super(user) }
    //cim pomenete neki repizitorijum morate da ga evidentirate u vasm app modulu

    async register(data:UserRegistrationDto): Promise <User | ApiResponse>{
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        // naknadno ce mo izvrsoto proces validacija passworda

        const newUser: User = new User();
        newUser.email = data.email;
        newUser.passwordHash= passwordHashString;
        newUser.forename = data.forname;
        newUser.surname = data.surname;
        newUser.phoneNumber= data.phoneNumber;
        newUser.postalAddress=data.postalAddress;

        try {
            const savedUser = await this.user.save(newUser);

            if(!savedUser){
                throw new Error(" ");
            }
            return savedUser;

        } catch(e){ 
            
            return new ApiResponse('error',-6001, 'Can not create this user accunt');

        }     
    }
        async getById(id){
       
        return await this.user.findOne(id);
    }
    async getByEmail(email: string): Promise<User | null>{
        const user = await this.user.findOne({
        email: email 
    });
    if(user){
            return user;
        }
    return null;
    }
}


