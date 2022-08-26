import { Responses } from "../../../lib/response";
import { ItemRepository } from "../../../repository/implementations/ItemRepository";
import { FindByIdUseCase } from "../../../useCases/item/FindByIdUseCase";
import { GetByIdController } from "./getByIdController";

export const getByIdController = new GetByIdController(
    new Responses(),
    new FindByIdUseCase(
        new ItemRepository()
    )
)