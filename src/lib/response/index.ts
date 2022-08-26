import { Response } from 'express'

export class Responses{
    InternalError(res: Response, data?: any | null){
        return res.status(500).json({
            error: true,
            data: [],
            message: "Erro interno de servidor, contate o suporte."
        })
    }

    NotFound(res: Response, message: string){
        return res.status(404).json({
            error: false,
            data: [],
            message: message
        })
    }

    ParamsError(res: Response, message: string | undefined){
        return res.status(406).json({
            error: false,
            data: [],
            message: message
        })
    }

    Created(res: Response, data: any, message: string){
        return res.status(201).json({
            error: false,
            data: data,
            message: message
        })
    }

    res200(res: Response, data: any, message: string){
        return res.status(200).json({
            error: false,
            data: data,
            message: message
        })
    }
}