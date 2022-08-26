import { prismaClient } from "../../../prisma/prismaClient";
import { Item } from "../../entities/Classes/Item";
import { getEmpresaByToken } from "../../providers/getEmpresaByToken";
import { IItemRepository, ItemCreateDTO, PutResponse } from "../IItemRepository";

export class ItemRepository implements IItemRepository {
    async getAll(authToken: string): Promise<Item[]> {
        let itemList: Item[] = []

        const empresa = await getEmpresaByToken(authToken)

        if(!empresa) return []

        const itemsDb = await prismaClient.item.findMany({
            where: {
                empresa_id: empresa.id
            }
        })

        itemsDb.forEach(element => {
            itemList.push(element as Item)
        });

        return itemList;
    }
    async delete(id: string, authToken: string): Promise<void> {
        const empresa = await getEmpresaByToken(authToken)

        if(!empresa) return

        const item = await prismaClient.item.findFirst({
            where: {
                id
            }
        })

        if(item?.empresa_id === empresa.id){
            await prismaClient.item.delete({
                where: {
                    id
                }
            })
        }
    }
    async getById(id: string, authToken: string): Promise<Item | null> {
        const empresa = await getEmpresaByToken(authToken)

        if(!empresa) return null

        const item = await prismaClient.item.findUnique({
            where: {
                id
            }
        })

        if (!item) return null

        if(item.empresa_id === empresa.id){
            const itemClass = new Item(item as Item)

            return itemClass
        }
        return null
    }

    async post(props: ItemCreateDTO, authToken: string) {
        const empresa = await getEmpresaByToken(authToken)

        const item = await prismaClient.item.create({
            data: {
                sequencial_localiza: props.sequencial_localiza,
                codigo_de_barras: props.codigo_de_barras,
                plaqueta: props.plaqueta,
                andar: props.andar,
                localizacao: props.localizacao,
                descricao: props.descricao,
                dono: props.dono,
                lido: props.lido,
                tipo: props.tipo,
                empresa_id: empresa?.id
            }
        })

        return item as Item;
    }

    async put(id: string, props: ItemCreateDTO, authToken: string): Promise<PutResponse> {
        const empresa = await getEmpresaByToken(authToken)
        
        const item = await prismaClient.item.findFirst({
            where: {
                id
            }
        })

        if(!item){
            return {
                error: true,
                data: null,
                message: "Item não encontrado."
            }
        }

        if(item.empresa_id === empresa?.id){
            const updatedItem = await prismaClient.item.update({
                where: {
                    id
                },
                data: {
                    sequencial_localiza: props.sequencial_localiza,
                    codigo_de_barras: props.codigo_de_barras,
                    plaqueta: props.plaqueta,
                    andar: props.andar,
                    localizacao: props.localizacao,
                    descricao: props.descricao,
                    dono: props.dono,
                    lido: props.lido,
                    tipo: props.tipo
                }
            })
    
            return {
                error: false,
                data: updatedItem as Item
            }
        }
        return {
            error: true,
            data: null
        }
    }

    async addImage(id: string, foto_url: string, authToken: string): Promise<PutResponse> {
        const empresa = await getEmpresaByToken(authToken)

        const item = await prismaClient.item.findFirst({
            where: {
                id
            }
        })

        if(!item || item.empresa_id === empresa?.id){
            return {
                error: true,
                data: null,
                message: "Item não encontrado."
            }
        }

        const updatedItem = await prismaClient.item.update({
            where: {
                id
            },
            data: {
                foto_url
            }
        })

        return {
            error: false,
            data: updatedItem as Item
        }
    }
}