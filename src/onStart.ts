import { prismaClient } from "../prisma/prismaClient";
import { PasswordHash } from "./providers/passwordHash";

export async function onStart(){
    const adminEmail = process.env.ADMIN_USER_EMAIL
    const adminPassword = process.env.ADMIN_USER_PASSWORD
    const adminEmpresa = process.env.ADMIN_EMPRESA
    const crypto = new PasswordHash()

    if(!adminEmail || !adminPassword || !adminEmpresa) return

    const password_hash = await crypto.createHash(adminPassword)

    const empresaAlreadyExist = await prismaClient.empresa.findFirst({
        where: {
            name: "Localiza Software"
        }
    })

    const userAlreadyExist = await prismaClient.user.findFirst({
        where: {
            email: "localizasoft@gmail.com"
        }
    })

    let userId = ""
    let empresaId = ""

    if(userAlreadyExist){
        userId = userAlreadyExist.id
    }

    if(empresaAlreadyExist){
        empresaId = empresaAlreadyExist.id
    }

    if(!userAlreadyExist){
        const createdUser = await prismaClient.user.create({
            data: {
                email: adminEmail,
                password_hash: password_hash,
            }
        })

        userId = createdUser.id;
    }

    if(!empresaAlreadyExist) {
        const createdEmpresa = await prismaClient.empresa.create({
            data: {
                name: adminEmpresa
            }
        })

        empresaId = createdEmpresa.id
    }

    const updatedUser = await prismaClient.user.update({
        where: {
            id: userId
        },
        data: {
            empresa_id: empresaId
        }
    })
}