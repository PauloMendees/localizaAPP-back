import { Empresa } from "../Classes/Empresa";

export class ReadUser {
    public id: string;
    public email: string;
    public created_at: Date;
    public empresa?: Empresa | null
    public empresa_id?: string | null

    constructor(props: ReadUser){
        this.id = props.id;
        this.email = props.email;
        this.created_at = props.created_at;
        this.empresa = props.empresa;
        this.empresa_id = props.empresa_id;
    }
}