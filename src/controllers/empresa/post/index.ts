import { Responses } from "../../../lib/response";
import { EmpresaRepository } from "../../../repository/implementations/EmpresaRepository";
import { CreateUseCase } from "../../../useCases/empresa/CreateUseCase";
import { PostController } from "./postController";

export const postController = new PostController(
    new Responses(),
    new CreateUseCase(
        new EmpresaRepository()
    )
)