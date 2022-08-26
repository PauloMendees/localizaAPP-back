import { Router } from "express";
import { DeleteController } from "../controllers/itemController/deleteController";
import { GetAllItemsController } from "../controllers/itemController/getAllController";
import { GetItemByIdController } from "../controllers/itemController/getByIdController";
import { PhotoController } from "../controllers/itemController/photoAddController";
import { PostController } from "../controllers/itemController/postController";
import { PutController } from "../controllers/itemController/putController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";

const itemRoute = Router()

const getAllItems = new GetAllItemsController()
const getItemById = new GetItemByIdController()
const deleteItem = new DeleteController()
const postItem = new PostController()
const putItem = new PutController()
const photoController = new PhotoController()

itemRoute.get("/api/item/getall", ensureAuthenticated, getAllItems.handle)
itemRoute.get("/api/item/getById/:id", ensureAuthenticated, getItemById.handle)

itemRoute.delete("/api/item/delete/:id", ensureAuthenticated, deleteItem.handle)

itemRoute.post("/api/item/post", ensureAuthenticated, postItem.handle)

itemRoute.put("/api/item/put/:id", ensureAuthenticated, putItem.handle)
itemRoute.put("/api/item/addPhoto/:id", ensureAuthenticated, photoController.handle)
export { itemRoute }