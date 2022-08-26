import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';
import { env } from 'process';

export async function registerUserAuthenticate(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            error: true,
            message: "Ops, parece que você pulou alguma etapa."
        })
    }

    const [, token] = authToken.split(" ");

    try {
        verify(token, `${env.CREATE_USER_ACCESS_TOKEN_SECRET}`)

        return next()
    } catch (error) {
        return response.status(401).json({
            error: true,
            message: "Realize as verificações necessárias."
        })
    }
}