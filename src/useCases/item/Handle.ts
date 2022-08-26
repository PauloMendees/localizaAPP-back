import { prismaClient } from "../../../prisma/prismaClient";
import { Item } from "../../entities/Classes/Item";
import { IHandleItems, PutResponse } from "./IHandleItems";

export class HandleItem implements IHandleItems {
    async getAll(): Promise<Item[]> {
        let itemList: Item[] = []

        const itemsDb = await prismaClient.item.findMany()

        itemsDb.forEach(element => {
            itemList.push(element as Item)
        });

        return itemList;
    }
    async delete(id: string): Promise<void> {
        await prismaClient.item.delete({
            where: {
                id
            }
        })
    }
    async getById(id: string): Promise<Item | null> {
        const item = await prismaClient.item.findUnique({
            where: {
                id
            }
        })

        if (!item) return null

        const itemClass = new Item(item as Item)

        return itemClass
    }

    async post(sequencial_localiza: string, codigo_de_barras: string, plaqueta: string, andar: string, localizacao: string, descricao: string, dono: string, lido: string, tipo: string) {
        const item = await prismaClient.item.create({
            data: {
                sequencial_localiza,
                codigo_de_barras,
                plaqueta,
                andar,
                localizacao,
                descricao,
                dono,
                lido,
                tipo
            }
        })

        return item as Item;
    }

    async put(id: string, sequencial_localiza: string, codigo_de_barras: string, plaqueta: string, andar: string, localizacao: string, descricao: string, dono: string, lido: string, tipo: string): Promise<PutResponse> {
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

        const updatedItem = await prismaClient.item.update({
            where: {
                id
            },
            data: {
                sequencial_localiza,
                codigo_de_barras,
                plaqueta,
                andar,
                localizacao,
                descricao,
                dono,
                lido,
                tipo
            }
        })

        return {
            error: false,
            data: updatedItem as Item
        }
    }

    async addImage(id: string, foto_url: string): Promise<PutResponse> {
        const item = await prismaClient.item.findFirst({
            where: {
                id
            }
        })

        if(!item){
            return {
                error: true,
                data: item,
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