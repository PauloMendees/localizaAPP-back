import jwt from 'jsonwebtoken'
import { prismaClient } from '../../prisma/prismaClient';
import { Empresa } from '../entities/Classes/Empresa';

export async function getEmpresaByToken(authToken: string){
    const [, token] = authToken.split(" ");

    const secret = process.env.ACCESS_TOKEN_SECRET
    const decoded = jwt.verify(token, `${secret}`)

    //@ts-ignore
    const userId = decoded.id

    const user = await prismaClient.user.findFirst({
        where: {
            id: userId
        }
    })

    if(!user || !user.empresa_id) return

    const empresaDb = await prismaClient.empresa.findFirst({
        where: {
            id: user.empresa_id
        }
    })

    if(!empresaDb) return

    const empresa = new Empresa(empresaDb)

    return empresa;
}