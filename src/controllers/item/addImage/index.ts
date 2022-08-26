import { Responses } from "../../../lib/response";
import { ItemRepository } from "../../../repository/implementations/ItemRepository";
import { AddImageUseCase } from "../../../useCases/item/AddImageUseCase";
import { AddImageController } from "./addImageController";

export const addImageController = new AddImageController(
    new Responses(),
    new AddImageUseCase(
        new ItemRepository()
    )
)