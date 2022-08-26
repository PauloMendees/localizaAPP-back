import { PasswordHash } from "../../../providers/passwordHash";
import { SendEmailService } from "../../../providers/sendEmailRegisterUser";
import { Validations } from "../../../providers/validations";
import { UserCodeRepository } from "../../../repository/implementations/UserCodeRepository";
import { UserRepository } from "../../../repository/implementations/UserRepository";
import { CodeVerifyUsecase } from "../../../useCases/user/register/implementations/codeVerifyUseCase";
import { CreateUseCase } from "../../../useCases/user/register/implementations/createUseCase";
import { SendCodeUseCase } from "../../../useCases/user/register/implementations/sendCodeUseCase";
import { RegisterController } from "./registerController";

const sendCodeUseCase = new SendCodeUseCase(
  new UserRepository(),
  new UserCodeRepository(),
  new Validations(),
  new SendEmailService(),
  new PasswordHash()
);

const createUserUseCase = new CreateUseCase(
  new UserRepository(),
  new Validations(),
  new PasswordHash()
);

const codeVerifyUseCase = new CodeVerifyUsecase(new UserCodeRepository());

export const registerController = new RegisterController(
  sendCodeUseCase,
  codeVerifyUseCase,
  createUserUseCase
);
