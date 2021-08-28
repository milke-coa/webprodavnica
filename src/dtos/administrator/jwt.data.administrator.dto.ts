export class JwtDataAdministratorDto {

    aministratorId:number;
    username:string;
    exp: number;//unix timestamp
    ip: string;
    ua: string;

    toPlainObject(){
        return {
                    aministratorId : this.aministratorId,
                    username: this.username,
                    exp: this.exp,
                    ip: this.ip,
                    ua: this.ua
                 }

    }
}
