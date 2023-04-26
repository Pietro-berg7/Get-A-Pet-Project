import { Router } from "express";

import { PetController } from "../controllers/PetController";

import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.post("/create", verifyToken, PetController.create);

export default router;
