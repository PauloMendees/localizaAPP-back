import { Item } from "../../entities/Classes/Item"

export type PutResponse = {
    error: boolean,
    data: Item | null,
    message?: string
}

export interface IHandleItems {
    getAll(): Promise<Item[]>
    delete(id: string): Promise<void>
    getById(id: string): Promise<Item | null>
    post(sequencial_localiza: string, codigo_de_barras: string, plaqueta: string, andar: string, localizacao: string, descricao: string, dono: string, lido: string, tipo: string): Promise<Item>
    put(id: string, sequencial_localiza: string, codigo_de_barras: string, plaqueta: string, andar: string, localizacao: string, descricao: string, dono: string, foto_url: string, lido: string, tipo: string): Promise<PutResponse>
    addImage(id: string, foto_url: string): Promise<PutResponse>
}