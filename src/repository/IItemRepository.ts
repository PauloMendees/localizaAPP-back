import { Item } from "../entities/Classes/Item";

export type ItemCreateDTO = {
  sequencial_localiza: string;
  codigo_de_barras: string;
  plaqueta: string;
  andar: string;
  localizacao: string;
  descricao: string;
  dono: string;
  lido: string;
  tipo: string;
};

export type PutResponse = {
  error: boolean;
  data: Item | null;
  message?: string;
};

export interface IItemRepository {
  getAll(authToken: string): Promise<Item[]>;
  delete(id: string, authToken: string): Promise<void>;
  getById(id: string, authToken: string): Promise<Item | null>;
  post(props: ItemCreateDTO, authToken: string): Promise<Item>;
  put(id: string, item: ItemCreateDTO, authToken: string): Promise<PutResponse>;
  addImage(
    id: string,
    foto_url: string,
    authToken: string
  ): Promise<PutResponse>;
}
