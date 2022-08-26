import { RegisterUserCode } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { env } from "process";
import { prismaClient } from "../../../prisma/prismaClient";
import { PasswordHash } from "../../providers/passwordHash";
import { IUserCodeRepository } from "../IUserCodeRepository";

export class UserCodeRepository implements IUserCodeRepository {
    async registerUserCode(email: string, hashedCode: string): Promise<RegisterUserCode> {
        const code = await prismaClient.registerUserCode.create({
            data: {
                email,
                hashed_code: hashedCode
            }
        })

        return code;
    }
    async deleteRegisterCodes(email: string): Promise<void> {
        await prismaClient.registerUserCode.deleteMany({
            where: {
                email
            }
        })
    }

    async verifyCode(email: string, code: string) {
        const bd_code = await prismaClient.registerUserCode.findFirst({
            where: {
                email
            }
        })

        if (bd_code) {
            const cryptograph = new PasswordHash()

            const validCode = await cryptograph.comparePassword(code, bd_code.hashed_code);

            if (validCode) {
                const token = sign({}, `${env.CREATE_USER_ACCESS_TOKEN_SECRET}`, {
                    subject: email,
                    expiresIn: "900s"
                })

                const deletedCode = await prismaClient.registerUserCode.deleteMany({
                    where: {
                        email
                    }
                })

                return {
                    valid: true,
                    token: token
                }
            }
        } return {
            valid: false
        }
    }
}