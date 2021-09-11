export class LoginInfoDto{

    id: number;
    indentity: string;
    token: string;

    constructor(id:number, indentity:string, jwt:string){
        this.id = id;
        this.indentity= indentity;
        this.token=jwt;

    }
}