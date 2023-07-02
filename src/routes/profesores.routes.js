import { Router } from "express";
import {getProfesores, getProfesor,createProfesor,updateProfesor,deleteProfesor} from "../controllers/profesores.controller.js"
import router from "./alumnos.routes";

const router = Router()

router.get('/profesores', getProfesores)

router.get('/profesores/:id', getProfesor)

router.post('/profesores', createProfesor)

router.patch('/profesores/:id', updateProfesor)

router.delete('/profesores/:id', deleteProfesor)