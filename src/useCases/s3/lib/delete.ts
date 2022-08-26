import { prismaClient } from "../../../../prisma/prismaClient"
import { S3Instance } from "../S3Instance"

type DeleteResponse = {
    error: boolean,
    data: any,
    message: string
}

export class Delete {
    private s3 = new S3Instance();

    async execute(itemId: string): Promise<DeleteResponse> {
        try {
            const item = await prismaClient.item.findFirst({
                where: {
                    id: itemId
                }
            })
            if(!item) return {
                error: true,
                data: [],
                message: "Nenhum item foi encontrado com esse ID."
            }
            const objectExtensionSplit = item.foto_url?.split('.');
            if(!objectExtensionSplit) throw new Error()
            var deleteParams = {
                Bucket: `${process.env.AWS_BUCKET_NAME}`,
                Key: `${itemId}.${objectExtensionSplit[5]}`
            }
            const deleteData = await this.s3.getInstance().deleteObject(deleteParams, function(err: any, data: any) {
                if (err) {
                    return {
                        error: true,
                        data: deleteData,
                        message: "Erro ao deletar."
                    }
                }
                return{     // deleted
                    error: false,
                    data: [],
                    message: "Foto deletada com sucesso."
                }
            });
            return{     // deleted
                error: false,
                data: [],
                message: "Foto deletada com sucesso."
            }
        } catch (e) {
            return {
                error: true,
                data: e,
                message: "Erro interno de servidor, contate o suporte."
            }
        }
    }
}