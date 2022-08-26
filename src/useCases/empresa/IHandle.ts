import { Empresa } from "../../entities/Classes/Empresa";

export interface IHandleEmpresa {
    getAll(): Promise<Empresa[]>
    getById(id: string): Promise<Empresa | null>;
    post(name: string): Promise<Empresa>;
    put(id: string, name: string): Promise<Empresa>;
    delete(id: string): Promise<void>;
}