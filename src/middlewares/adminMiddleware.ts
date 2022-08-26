import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prismaClient } from '../../prisma/prismaClient';

export async function adminMiddleware(request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            error: true,
            message: "Favor realize sua autenticação."
        })
    }

    const [, token] = authToken.split(" ");

    const secret = process.env.ACCESS_TOKEN_SECRET

    if(!secret) return response.status(500).json({
        error: true,
        message: "Erro interno de servidor."
    })
    try {
        const decoded = jwt.verify(token, `${secret}`)
        //@ts-ignore  
        const id = decoded.id;  

        const user = await prismaClient.user.findFirst({
            where: {
                id
            }
        })

        if(!user) {
            return response.status(500).json({
                error: true,
                message: "Você não tem permissão para realizar essa ação."
            })
        }

        if(user.email === process.env.ADMIN_USER_EMAIL){
            return next()
        } else {
            return response.status(500).json({
                error: true,
                message: "Você não tem permissão para realizar essa ação."
            })
        }

    } catch (error) {
        return response.status(500).json({
            error: true,
            message: "Você não tem permissão para realizar essa ação."
        })
}
}