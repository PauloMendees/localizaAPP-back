//Controller to validate email and password to authenticate and return a jwt token
import { Request, Response } from 'express'
import { prismaClient } from '../../../prisma/prismaClient'
import { PasswordHash } from '../../providers/passwordHash'
import { sign } from 'jsonwebtoken'
import { env } from "process";
import { Prisma } from '@prisma/client';

export class UserLogin{
    async handle(req: Request, res: Response){
        try {
            const passwordHash = new PasswordHash()
            const { email, password } = req.body

            const user = await prismaClient.user.findFirst({
                where: {
                    email
                }
            })

            if(!user) return res.status(406).json({
                error: true,
                message: "Email ou senha inválidos."
            })

            const passwordMatch = await passwordHash.comparePassword(password, user.password_hash)

            if(passwordMatch) {
                const token = sign({}, `${env.ACCESS_TOKEN_SECRET}`, {
                    subject: user.id,
                    expiresIn: "360000000000s"
                })

                return res.status(200).json({
                    error: false,
                    message: "Login success.",
                    data: token
                })
            }

            return res.status(406).json({
                error: true,
                message: "Email ou senha inválidos."
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return res.status(404).json({
                        error: true,
                        message: "Usuário não encontrado."
                    });
                }else{
                    return res.status(500).json({
                        error: true,
                        message: "Erro interno de servidor, contate o suporte."
                    });
                }
            }
        }
    }
}