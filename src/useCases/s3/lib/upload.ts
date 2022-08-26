import { prismaClient } from "../../../../prisma/prismaClient";
import { S3Instance } from "../S3Instance";

const fs = require('fs')

type UploadResponse = {
    error: boolean,
    message: string,
    data?: any
}

export class Upload {
    private s3 = new S3Instance();
    
    async execute(file: Express.Multer.File, itemId: string): Promise<UploadResponse> {
        try {
            
            const item = await prismaClient.item.findFirst({
                where: {
                    id: itemId
                }
            })
            
            if(!item) {
                return {
                    error: true,
                    message: "Item não encontrado.",
                }
            }
            //@ts-ignore
            const fileStream = fs.createReadStream(file.path)
            //@ts-ignore
            const splitedString = file.originalname.split('.')
            const extensionValidate = splitedString[splitedString.length - 1].toLowerCase() !== 'jpg' && splitedString[1].toLowerCase() !== '.png'
            if (extensionValidate) {
                return {
                    error: true,
                    message: "Apenas imagens (.jpg / .png)."
                }
            }
    
            const uploadParams = {
                Bucket: `${process.env.AWS_BUCKET_NAME}`,
                Body: fileStream,
                Key: `${itemId}.${splitedString[splitedString.length - 1].toString()}`
            }
    
            const uploadResponse = await this.s3.getInstance().upload(uploadParams).promise()

            const updatedItem = await prismaClient.item.update({
                where: {
                    id: itemId
                },
                data: {
                    foto_url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${itemId}.${splitedString[1].toString()}`
                }
            })

            return {
                error: false,
                message: "Upload executado com sucesso.",
                data: uploadResponse
            }

        } catch (error) {
            return {
                error: true,
                message: "Erro interno de servidor.",
                data: error
            }
        }
    }
}