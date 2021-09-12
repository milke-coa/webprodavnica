/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate,  ExecutionContext,  Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleCheckerGuard implements CanActivate{
    constructor(private reflector: Reflector){}
        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const req: Request = context.switchToHttp().getRequest();
        const role = req.token.role;
      
        const allowedRoles = this.reflector.get <("administrator"|"user")[]>('allow_to_roles', context.getHandler());
        


            if(!allowedRoles.includes(role)){
                             
                return false;
            }

            return true;

        }
    }