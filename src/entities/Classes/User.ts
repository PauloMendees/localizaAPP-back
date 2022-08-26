import { Empresa } from "./Empresa";

export class User {
    public id: string;
    public email: string;
    public password_hash: string;
    public created_at: Date;
    public empresa?: Empresa | null
    public empresa_id?: string | null

    constructor(props: User){
        this.id = props.id;
        this.email = props.email;
        this.password_hash = props.password_hash;
        this.created_at = props.created_at;
        this.empresa = props.empresa;
        this.empresa_id = props.empresa_id;
    }
}