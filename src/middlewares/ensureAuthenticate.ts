import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';
import { env } from 'process';

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).json({
            error: true,
            message: "Favor realize sua autenticação."
        })
    }

    const [, token] = authToken.split(" ");

    try {
        verify(token, `${env.ACCESS_TOKEN_SECRET}`)

        return next()
    } catch (error) {
        return response.status(401).json({
            error: true,
            message: "Autenticação inválida."
        })
    }
}