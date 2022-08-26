import { Router } from 'express'
import { DeleteController } from '../controllers/empresaController/deleteController'
import { GetAllController } from '../controllers/empresaController/getAllController'
import { GetByIdController } from '../controllers/empresaController/getByIdController'
import { PostController } from '../controllers/empresaController/postController'
import { PutController } from '../controllers/empresaController/putController'

const empresaRouter = Router()
const postController = new PostController()
const putController = new PutController()
const getAllController = new GetAllController()
const getByIdController = new GetByIdController()
const deleteController = new DeleteController()

empresaRouter.post("/api/empresa/post", postController.handle)
empresaRouter.put("/api/empresa/put/:id", putController.handle)
empresaRouter.get("/api/empresa/getall", getAllController.handle)
empresaRouter.get("/api/empresa/getById/:id", getByIdController.handle)
empresaRouter.delete("/api/empresa/delete/:id", deleteController.handle)

export { empresaRouter }