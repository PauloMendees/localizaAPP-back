import { Responses } from "../../../lib/response";
import { ItemRepository } from "../../../repository/implementations/ItemRepository";
import { ListUseCase } from "../../../useCases/item/ListUseCase";
import { GetAllController } from "./getAllController";

export const getAllController = new GetAllController(
    new Responses(),
    new ListUseCase(
        new ItemRepository()
    )
)