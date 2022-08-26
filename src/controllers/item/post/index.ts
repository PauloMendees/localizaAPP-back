import { Responses } from "../../../lib/response";
import { ItemRepository } from "../../../repository/implementations/ItemRepository";
import { CreateUseCase } from "../../../useCases/item/CreateUseCase";
import { PostController } from "./postController";

export const postController = new PostController(
    new Responses(),
    new CreateUseCase(
        new ItemRepository()
    )
)