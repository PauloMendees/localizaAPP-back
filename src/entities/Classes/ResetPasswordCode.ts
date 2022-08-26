export class ResetPasswordCode {
    public id: string;
    public email: string;
    public hashed_code: string;
    public created_at: string;

    constructor(props: ResetPasswordCode){
        this.id = props.id;
        this.email = props.email;
        this.hashed_code = props.hashed_code;
        this.created_at = props.created_at;
    }
}