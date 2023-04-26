import { Router } from "express";

import { PetController } from "../controllers/PetController";

import { verifyToken } from "../middlewares/verifyToken";
import { imageUpload } from "../helpers/imageUpload";

const router = Router();

router.post(
  "/create",
  verifyToken,
  imageUpload.array("images"),
  PetController.create
);

export default router;
