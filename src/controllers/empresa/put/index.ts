import { Responses } from "../../../lib/response";
import { EmpresaRepository } from "../../../repository/implementations/EmpresaRepository";
import { UpdateUseCase } from "../../../useCases/empresa/UpdateUseCase";
import { PutController } from "./putController";

export const putController = new PutController(
    new Responses(),
    new UpdateUseCase(
        new EmpresaRepository()
    )
)