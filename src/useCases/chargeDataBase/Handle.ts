import { prismaClient } from "../../../prisma/prismaClient";
import { Item } from "../../entities/Classes/Item";
import { IHandleChargeDataBase, ResponseCharge } from "./IHandleChargeDataBase";
var reader = require("xlsx");

export class HandleChargeDataBase implements IHandleChargeDataBase {
    async charge(file: Express.Multer.File): Promise<ResponseCharge> {
        try {
            const filePath = file.path;
            // Reading our test file
            const fileReader = reader.readFile(filePath)

            let data: Item[] = []

            const sheets = fileReader.SheetNames

            for (let i = 0; i < sheets.length; i++) {
                const temp = reader.utils.sheet_to_json(
                    fileReader.Sheets[fileReader.SheetNames[i]])
                temp.forEach((res: Item) => {
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