import { prismaClient } from "../../../prisma/prismaClient";
import { User } from "../../entities/Classes/User";
import { ReadUser } from "../../entities/DTO/ReadUser";
import { PasswordHash } from "../../providers/passwordHash";
import { Validations } from "../../providers/validations";
import { IUserRepository, ResType } from "../IUserRepository";
import { EmpresaRepository } from "./EmpresaRepository";

export class UserRepository implements IUserRepository {
    async getUsers() {
        const userList: ReadUser[] = []

        const usersDatabase = await prismaClient.user.findMany()
        const empresas = await prismaClient.empresa.findMany()

        usersDatabase.forEach(element => {
            const empresa = empresas.find(x => x.id === element.empresa_id)
            const readUserDTO = new ReadUser(element)
            readUserDTO.empresa = empresa
            userList.push(readUserDTO)
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
        
        if(!userDatabase) return null

        const user = new User(userDatabase)

        return user;
    }

    async getUserById(id: string): Promise<ReadUser | null> {
        const userDb = await prismaClient.user.findFirst({
            where: {
                id
            }
        })

        if(!userDb) return null

        if(userDb.empresa_id){
            const empresa = await prismaClient.empresa.findFirst({
                where: {
                    id: userDb.empresa_id
                }
            })
            if(!userDb) return null
            const userDTO = new ReadUser(userDb)
    
            return userDTO
        } else {
            return new ReadUser(userDb);
        }
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
        const handleEmpresa = new EmpresaRepository()

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