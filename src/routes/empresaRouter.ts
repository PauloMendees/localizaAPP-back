import { Request, Response, Router } from 'express'
import { deleteController } from '../controllers/empresa/delete';
import { getAllController } from '../controllers/empresa/getAll';
import { postController } from '../controllers/empresa/post'
import { putController } from '../controllers/empresa/put';
import { adminMiddleware } from '../middlewares/adminMiddleware';

const empresaRouter = Router();

empresaRouter.post("/api/empresa/post", adminMiddleware, (req: Request, res: Response) => {
    return postController.handle(req, res);
})

empresaRouter.put("/api/empresa/put/:id", adminMiddleware, (req: Request, res: Response) => {
    return putController.handle(req, res);
})

empresaRouter.get("/api/empresa/getall", adminMiddleware, (req: Request, res: Response) => {
    return getAllController.handle(req, res);
})

empresaRouter.delete("/api/empresa/delete/:id", adminMiddleware, (req: Request, res: Response) => {
    return deleteController.handle(req, res);
})

export { empresaRouter }