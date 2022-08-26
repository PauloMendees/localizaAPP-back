//Create route's to make the API work's online
import { Router, Response, Request } from "express";
import { deleteController } from "../controllers/user/delete";
import { getAllController } from "../controllers/user/getAll";
import { UserLogin } from "../controllers/user/loginController";
import { registerController } from "../controllers/user/register";
import { resetPasswordController } from "../controllers/user/resetPassword";
import { vinculateController } from "../controllers/user/vinculate";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { registerUserAuthenticate } from "../middlewares/registerUserAuthenticate";
import { ResetPasswordAuthenticate } from "../middlewares/resetPasswordAuthenticate";

const userRoute = Router()
const userLogin = new UserLogin()

userRoute.get('/api/user/getall', adminMiddleware, (req: Request, res: Response) => {
    return getAllController.handle(req, res);
})

userRoute.delete('/api/user/delete/:id', adminMiddleware, (req: Request, res: Response) => {
    return deleteController.handle(req, res);
})

userRoute.put('/api/user/changePassword', ResetPasswordAuthenticate, (req: Request, res: Response) => {
    resetPasswordController.changePassword(req, res);
})
userRoute.put('/api/user/vinculate/:id', adminMiddleware, (req: Request, res: Response) => {
    return vinculateController.handle(req, res);
})

userRoute.post('/api/user/login', userLogin.handle)

userRoute.post('/api/user/initResetPassword', (req: Request, res: Response) => {
    return resetPasswordController.initRequest(req, res)
})

userRoute.post('/api/user/verifyResetCode', (req: Request, res: Response) => {
    return resetPasswordController.codeVerify(req, res)
})

userRoute.post('/api/user/startRegister', (req: Request, res: Response) => {
    return registerController.sendCode(req, res)
})

userRoute.post('/api/user/registerCodeVerify', (req: Request, res: Response) => {
    return registerController.codeVerify(req, res)
})

userRoute.post('/api/user/register', registerUserAuthenticate, (req: Request, res: Response) => {
    return registerController.create(req, res)
})

export { userRoute }