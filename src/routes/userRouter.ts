//Create route's to make the API work's online
import { Router } from "express";
import { DeleteUser } from "../controllers/userController/deleteController";
import { GetAllUsers } from "../controllers/userController/getAllController";
import { GetUserById } from "../controllers/userController/getByIdController";
import { UserLogin } from "../controllers/userController/loginController";
import { PostUser } from "../controllers/userController/postController";
import { PutUser } from "../controllers/userController/putController";
import { RegisterNewUser } from "../controllers/userController/registerController";
import { ResetPassword } from "../controllers/userController/resetPasswordController";
import { VinculateUser } from "../controllers/userController/vinculateController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";
import { registerUserAuthenticate } from "../middlewares/registerUserAuthenticate";
import { ResetPasswordAuthenticate } from "../middlewares/resetPasswordAuthenticate";

const userRoute = Router()

const postUser = new PostUser()
const getAllUsers = new GetAllUsers()
const deleteUser = new DeleteUser()
const putUser = new PutUser()
const getUserById = new GetUserById()
const resetPassword = new ResetPassword()
const userLogin = new UserLogin()
const registerUser = new RegisterNewUser()
const vinculate = new VinculateUser()

userRoute.get('/api/user/getall', ensureAuthenticated, getAllUsers.handle)
userRoute.get('/api/user/getById/:id', ensureAuthenticated, getUserById.handle)

userRoute.delete('/api/user/delete/:id', ensureAuthenticated, deleteUser.handle)

userRoute.put('/api/user/put/:id', ensureAuthenticated, putUser.handle)
userRoute.put('/api/user/changePassword', ResetPasswordAuthenticate, resetPassword.changePassword)
userRoute.put('/api/user/vinculate/id', vinculate.handle)

userRoute.post('/api/user/post', ensureAuthenticated, postUser.handle)
userRoute.post('/api/user/login', userLogin.handle)
userRoute.post('/api/user/initResetPassword', resetPassword.initRequest)
userRoute.post('/api/user/verifyResetCode', resetPassword.codeVerify)
userRoute.post('/api/user/startRegister', registerUser.sendCode)
userRoute.post('/api/user/registerCodeVerify', registerUser.codeVerify)
userRoute.post('/api/user/register', registerUserAuthenticate, registerUser.create)

export { userRoute }