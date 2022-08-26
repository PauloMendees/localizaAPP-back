import { prismaClient } from "../../../prisma/prismaClient";
import { User } from "../../entities/Classes/User";
import { PasswordHash } from "../../providers/passwordHash";
import { Validations } from "../../providers/validations";
import { HandleEmpresa } from "../empresa/Handle";
import { IHandleUser, ResType } from "./IHandleUser";

export class HandleUser implements IHandleUser {
    async getUsers() {
        const userList: User[] = []

        const usersDatabase = await prismaClient.user.findMany()
    
        usersDatabase.forEach(element => {
            userList.push(element as User)
        });

        return userList;
    }

    async deleteUser(id: string) {
        await prismaClient.user.delete({
            where: {
                id
            }
        })
    }

    async verifyIfAlreadyExist(email: string) {
        const userDatabase = await prismaClient.user.findFirst({
            where: {
                email
            }
        })
        
        const user = new User(userDatabase as User)

        return user;
    }

    async getUserById(id: string): Promise<User | null> {
        const userDb = await prismaClient.user.findFirst({
            where: {
                id
            }
        })

        if(!userDb) return null
        const userDTO = new User(userDb)

        return userDTO

    }

    async postUser(email: string, password: string, confirmPassword: string) {
        const validations = new Validations()
        const cryptograph = new PasswordHash()
        const password_hash = await cryptograph.createHash(password)
        const cannotBeCreated = await validations.validateUser(email, password, confirmPassword)

        const verifyIfAlreadyExist = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (verifyIfAlreadyExist) {
            return {
                error: true,
                code: 406,
                message: "Usuário já existente."
            }
        }

        if (cannotBeCreated.error) {
            return {
                error: true,
                message: cannotBeCreated.message,
                code: 406
            }
        }

        const createdUser = await prismaClient.user.create({
            data: {
                email,
                password_hash
            }
        })

        const newUser = new User(createdUser as User)

        return {
            error: false,
            message: "Usuário criado com sucesso.",
            data: newUser,
            code: 200
        }
    }

    async putUser(id: string, email: string) {
        const validations = new Validations()

        const emailIsValid = await validations.emailValidate(email)
        const fieldsValidation = await validations.userFieldsValidation(email, 'password')

        if(emailIsValid && fieldsValidation){
            const updatedUserDatabase = await prismaClient.user.update({
                where: {
                    id
                },
                data: {
                    email
                }
            })

            const updatedUser = new User(updatedUserDatabase as User)

            return {
                error: false,
                code: 200,
                message: 'Usuário alterado com sucesso.',
                data: updatedUser
            }
        }

        return {
            error: true,
            code: 406,
            message: "Campos inválidos, favor revisar se nome está preenchido e se o email é válido."
        }
    }
    async vinculateEmpresa(idUser: string, idEmpresa: string): Promise<ResType> {
        const handleEmpresa = new HandleEmpresa()

        const empresa = await handleEmpresa.getById(idEmpresa)

        if(!empresa) return {
            code: 404,
            error: true,
            message: "Empresa não encontrada.",
            data: undefined
        }

        const vinculatedUser = await prismaClient.user.update({
            where: {
                id: idUser
            },
            data: {
                empresa_id: idEmpresa
            }
        })

        if(!vinculatedUser) return {
            code: 404,
            error: true,
            message: "Usuário não encontrado com esse id.",
            data: undefined
        }

        const user: User = new User(vinculatedUser);

        return {
            error: false,
            code: 200,
            message: "Usuário vinculado com sucesso.",
            data: user
        }
    }
}