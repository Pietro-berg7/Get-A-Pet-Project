import { Router } from "express";

import {
  PetController,
  validatePetRegisterMiddleware,
} from "../controllers/PetController";

import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.post(
  "/create",
  validatePetRegisterMiddleware,
  verifyToken,
  PetController.create
);

export default router;
