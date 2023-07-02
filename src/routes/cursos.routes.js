import { Router } from "express"
import { getCursos,getCurso ,createCursos, updateCursos, deleteCursos} from "../controllers/cursos.controller.js"
const router = Router()

router.get('/cursos', getCursos)

router.get('/cursos/:id', getCurso)

router.post('/cursos', createCursos)

router.patch('/cursos/:id', updateCursos)

router.delete('/cursos/:id', deleteCursos)


export default router