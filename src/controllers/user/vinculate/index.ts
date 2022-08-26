import { Responses } from "../../../lib/response";
import { UserRepository } from "../../../repository/implementations/UserRepository";
import { VinculateUserUseCase } from "../../../useCases/user/VinculateUserUseCase";
import { VinculateController } from "./vinculateController";

export const vinculateController = new VinculateController(
    new Responses(),
    new VinculateUserUseCase(
        new UserRepository()
    )
)