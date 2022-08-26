//Service to cryptograph the user password before save on database ( create hash )
const bcrypt = require('bcrypt');

export class PasswordHash {
    //That function receives one string password and return it with cryptography.
    async createHash(password: String){
        const salt = 12;
        return await bcrypt.hash(password, salt)
    }

    //That function compare one password without cryptography with one who have it
    async comparePassword(password: String, hashPassword: String){
        return await bcrypt.compare(password, hashPassword)
    }
}