import { Router } from "express"
import { getNotas, getNota, createNotas, updateNotas, deleteNotas} from "../controllers/notas.controller.js"
const router = Router()

router.get('/notas', getNotas)

router.get('/notas/:id', getNota)

router.post('/notas', createNotas)

router.patch('/notas/:id', updateNotas)

router.delete('/notas/:id', deleteNotas)


export default router