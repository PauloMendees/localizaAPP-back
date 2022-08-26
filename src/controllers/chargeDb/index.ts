import { Responses } from "../../lib/response";
import { chargeDataBaseUseCase } from "../../useCases/chargeDataBase/chargeDataBaseUseCase";
import { ChargeController } from "./chargeController";

export const chargeController = new ChargeController(
    new Responses(),
    new chargeDataBaseUseCase()
)