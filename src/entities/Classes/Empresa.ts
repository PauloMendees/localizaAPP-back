import { User } from './User'
import { Item } from './Item'

export class Empresa {
    public id: string;
    public name: string
    public users?: User[]
    public items?: Item[]

    constructor(props: Empresa){
        this.id = props.id;
        this.name = props.name;
        this.users = props.users;
        this.items = props.items;
    }
}