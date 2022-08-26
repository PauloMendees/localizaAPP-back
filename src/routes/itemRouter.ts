import { Response, Router, Request } from "express";
import { addImageController } from "../controllers/item/addImage";
import { deleteController } from "../controllers/item/delete";
import { getAllController } from "../controllers/item/getAll";
import { getByIdController } from "../controllers/item/getById";
import { postController } from "../controllers/item/post";
import { putController } from "../controllers/item/put";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";

const itemRoute = Router()

itemRoute.get("/api/item/getall", ensureAuthenticated, (req: Request, res: Response) => {
    return getAllController.handle(req, res);
})
itemRoute.get("/api/item/getById/:id", ensureAuthenticated, (req: Request, res: Response) => {
    return getByIdController.handle(req, res);
})

itemRoute.delete("/api/item/delete/:id", ensureAuthenticated, (req: Request, res: Response) => {
    return deleteController.handle(req, res);
})

itemRoute.post("/api/item/post", ensureAuthenticated, (req: Request, res: Response) => {
    return postController.handle(req, res);
})

itemRoute.put("/api/item/put/:id", ensureAuthenticated, (req: Request, res: Response) => {
    return putController.handle(req, res);
})
itemRoute.put("/api/item/addPhoto/:id", ensureAuthenticated, (req: Request, res: Response) => {
    return addImageController.handle(req, res);
})

export { itemRoute }