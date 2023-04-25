import { Router } from "express";

import { PetController } from "../controllers/PetController";

const router = Router();

router.post("/create", PetController.create);

export default router;
