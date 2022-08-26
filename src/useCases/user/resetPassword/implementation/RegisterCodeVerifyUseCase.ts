import { prismaClient } from "../../../../../prisma/prismaClient";
import { PasswordHash } from "../../../../providers/passwordHash";
import { env } from "process";
import { sign } from 'jsonwebtoken'
import { ICodeVerifyUseCase, ResponseCodeVerify } from "../ICodeVerifyUseCase";

export class RegisterCodeVerifyUseCase implements ICodeVerifyUseCase {
  constructor(
    private hash: PasswordHash
  ) {}

  async execute(code: string, email: string): Promise<ResponseCodeVerify> {
    try {
      const bd_code = await prismaClient.resetPasswordCode.findFirst({
        where: {
          email,
        },
      });

      if (bd_code) {
        const codeMatch = await this.hash.comparePassword(
          code,
          bd_code.hashed_code
        );
        if (!codeMatch)
          return {
            error: true,
            message: "Código inválido.",
          };

        const token = sign({}, `${env.RESET_PASSWORD_ACCESS_TOKEN_SECRET}`, {
          subject: email,
          expiresIn: "3600s",
        });

        const deleteCode = await prismaClient.resetPasswordCode.deleteMany({
          where: {
            email,
          },
        });

        return {
            error: false,
            message: token,
          }
      }
      return {
        error: true,
        message: "Código não encontrado.",
      }
    } catch (e) {
        throw e;
    }
  }
}
