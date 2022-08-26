import { prismaClient } from "../../../../prisma/prismaClient";
import { S3Instance } from "../S3Instance";

type DownloadResponse = {
    error: boolean
    message: string
    data: any
}

export class Download {
    private s3 = new S3Instance()
    async execute(id: string): Promise<DownloadResponse>{
        try {
            const item = await prismaClient.item.findFirst({
                where: {
                    id
                }
            })

            if(!item){
                return {
                    error: true,
                    message: "Item não encontrado.",
                    data: []
                }
            }
            
            const objectExtensionSplit = item.foto_url?.split('.');
            if(!objectExtensionSplit) throw new Error()

            var downloadParams = {
                Bucket: `${process.env.AWS_BUCKET_NAME}`,
                Key: `${id}.${objectExtensionSplit[5]}`
            }

            var fileStream = this.s3.getInstance().getObject(downloadParams).createReadStream();

            return {
                error: false,
                message: "Objeto encontrado.",
                data: fileStream
            }
        } catch (e) {
            return {
                error: true,
                message: "Erro interno de servidor.",
                data: e
            }
        }
    }
}