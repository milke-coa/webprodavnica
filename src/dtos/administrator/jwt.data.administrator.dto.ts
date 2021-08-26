export class JwtDataAdministratorDto {

    aministratorId:number;
    username:string;
    ext: number;//unix timestamp
    ip: string;
    ua: string;

    toPlainObject(){
        return {
                    aministratorId : this.aministratorId,
                    username: this.username,
                    ext: this.ext,
                    ip: this.ip,
                    ua: this.ua
                 }

    }
}
