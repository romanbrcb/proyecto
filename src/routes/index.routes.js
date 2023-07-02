import { Router } from "express";
import { Ping } from "../controllers/index.controller.js";

const router = Router ()

router.get('/ping', Ping );
export default router