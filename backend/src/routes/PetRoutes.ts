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
router.get("/", PetController.getAll);
router.get("/mypets", verifyToken, PetController.getAllUserPets);
router.get("/myadoptions", verifyToken, PetController.getAllUserAdoptions);

export default router;
