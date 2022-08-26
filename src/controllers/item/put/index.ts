import { Responses } from "../../../lib/response";
import { ItemRepository } from "../../../repository/implementations/ItemRepository";
import { UpdateUseCase } from "../../../useCases/item/UpdateUseCase";
import { PutController } from "./putController";

export const putController = new PutController(
    new Responses(),
    new UpdateUseCase(
        new ItemRepository()
    )
)