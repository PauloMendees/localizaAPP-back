import { Responses } from "../../../lib/response";
import { EmpresaRepository } from "../../../repository/implementations/EmpresaRepository";
import { ListUseCase } from "../../../useCases/empresa/ListUsecase";
import { GetAllController } from "./getAllController";

export const getAllController = new GetAllController(
    new Responses(),
    new ListUseCase(
        new EmpresaRepository
    )
)