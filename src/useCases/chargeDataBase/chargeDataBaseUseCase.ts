import { prismaClient } from "../../../prisma/prismaClient";
import { Item } from "../../entities/Classes/Item";
import { getEmpresaByToken } from "../../providers/getEmpresaByToken";
import { IChargeDataBaseUseCase, ResponseCharge } from "./IChargeDataBaseUseCase";
var reader = require("xlsx");

export class chargeDataBaseUseCase implements IChargeDataBaseUseCase {
    async charge(file: Express.Multer.File, authToken: string): Promise<ResponseCharge> {
        try {
            const filePath = file.path;
            // Reading our test file
            const fileReader = reader.readFile(filePath)
            const empresa = await getEmpresaByToken(authToken)
            let data: Item[] = []

            const sheets = fileReader.SheetNames

            for (let i = 0; i < sheets.length; i++) {
                const temp = reader.utils.sheet_to_json(
                    fileReader.Sheets[fileReader.SheetNames[i]])
                temp.forEach((res: Item) => {
                    res.empresa_id = empresa?.id;
                    data.push(res)
                })
            }

            const createManyResponse = await prismaClient.item.createMany({
                data: data
            })

            return {
                error: false,
                message: "Upload concluído com sucesso.",
                data: createManyResponse
            }
        } catch (e) {
            throw e;
        }
    }

}