import { Responses } from "../../../lib/response";
import { ItemRepository } from "../../../repository/implementations/ItemRepository";
import { DeleteUseCase } from "../../../useCases/item/DeleteUseCase";
import { Delete } from "../../../useCases/s3/lib/delete";
import { DeleteController } from "./deleteController";

export const deleteController = new DeleteController(
    new Responses(),
    new DeleteUseCase(
        new ItemRepository()
    ),
    new Delete()
)