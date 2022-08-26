import { prismaClient } from "../../../prisma/prismaClient";
import { Empresa } from "../../entities/Classes/Empresa";
import { IHandleEmpresa } from "./IHandle";

export class HandleEmpresa implements IHandleEmpresa {
    async delete(id: string): Promise<void> {
        await prismaClient.empresa.delete({
            where: {
                id
            }
        })
    }

    async put(id: string, name: string): Promise<Empresa> {
        const updatedEmpresa = await prismaClient.empresa.update({
            where: {
                id
            },
            data: {
                name
            }
        })

        const empresa = new Empresa(updatedEmpresa)

        return empresa
    }

    async post(name: string): Promise<Empresa> {
        const empresaDb = await prismaClient.empresa.create({
            data: {
                name: name
            }
        })

        const empresa = new Empresa(empresaDb)

        return empresa
    }

    async getAll(): Promise<Empresa[]> {
        let empresaList: Empresa[] = []

        const empresasDb = await prismaClient.empresa.findMany()

        empresasDb.forEach(element => {
            empresaList.push(element as Empresa)
        });

        return empresaList;
    }

    async getById(id: string): Promise<Empresa | null> {
        const empresaDb = await prismaClient.empresa.findFirst({
            where: {
                id
            }
        })

        if(!empresaDb) return null;
        const empresa = new Empresa(empresaDb);

        return empresa;

    }
}