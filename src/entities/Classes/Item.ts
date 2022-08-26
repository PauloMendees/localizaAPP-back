import { Empresa } from './Empresa'

export class Item {
    public id: string;
    public plaqueta: string;
    public sequencial_localiza: string;
    public andar: string;
    public localizacao: string;
    public descricao: string;
    public lido: string;
    public data_inclusao: Date;
    public tipo: string;
    public foto_url?: string;
    public dono: string;
    public codigo_de_barras: string;
    public empresa?: Empresa | null
    public empresa_id?: string | null

    constructor(props: Item){
        this.id = props.id;
        this.plaqueta = props.plaqueta;
        this.sequencial_localiza = props.sequencial_localiza;
        this.andar = props.andar;
        this.localizacao = props.localizacao;
        this.descricao = props.descricao;
        this.lido = props.lido;
        this.data_inclusao = props.data_inclusao;
        this.tipo = props.tipo;
        this.foto_url = props.foto_url;
        this.dono = props.dono;
        this.codigo_de_barras = props.codigo_de_barras;
        this.empresa = props.empresa;
        this.empresa_id = props.empresa_id
    }
}