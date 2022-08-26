import { Responses } from "../../../lib/response";
import { EmpresaRepository } from "../../../repository/implementations/EmpresaRepository";
import { DeleteUseCase } from "../../../useCases/empresa/DeleteUseCase";
import { DeleteController } from "./deleteController";

export const deleteController = new DeleteController(
    new Responses(),
    new DeleteUseCase(
        new EmpresaRepository()
    )
)