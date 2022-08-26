//Validate fields and other things

export class Validations {
    //Validating if the fields are empty
    async userFieldsValidation(email: String, password: String) {
        if (email && password) return true
        return false
    }

    //Validating email
    async emailValidate(email: String) {
        var regex = /\S+@\S+\.\S+/;
        if (regex.test(email.toString())) return true
        return false
    }

    //Validating confirm password
    async confirmPasswordValidate(password: String, confirmPassword: String) {
        if (password === confirmPassword) return true
        return false
    }

    //Password conditions:
    //Min 1 capital letter.
    //Min 1 lower letter.
    //Min 1 special caracter.
    //Min 1 number.
    //Min 8 caracters.
    async validPassword(password: String) {
        var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
        if (regex.test(password.toString())) return true
        return false
    }
    //Validação geral
    async validateUser(email: String, password: String, confirmPassword: String){
        const fieldsValidation = await this.userFieldsValidation(email, password)
        const passwordConfirmation = await this.confirmPasswordValidate(password, confirmPassword)
        const passwordIsValid = await this.validPassword(password)
        const emailIsValid = await this.emailValidate(email)

        if(!emailIsValid) return {
            error: true,
            message: "Email inválido."
        }

        if(!fieldsValidation) return {
            error: true,
            message: "Nome, email e senha são campos requeridos."
        }

        if(!passwordConfirmation) return {
            error: true,
            message: "Senhas não conferem."
        }

        if(!passwordIsValid) return {
            error: true,
            message: "Senha inválida, deve haver 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial."
        }

        return {
            error: false,
            message: ''
        }
    }
}