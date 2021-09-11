export class JwtDataDto {
    role: "administrator" | "user";
    id:number;
    indentity:string;
    exp: number;//unix timestamp
    ip: string;
    ua: string;

    toPlainObject(){
        return {
                    role: this.role,
                    id : this.id,
                    indentity: this.indentity,
                    exp: this.exp,
                    ip: this.ip,
                    ua: this.ua
                 }

    }
}
