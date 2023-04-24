import { Router } from "express";

import {
  UserController,
  validateLoginMiddleware,
  validateRegisterMiddleware,
  validateUpdateMiddleware,
  verifyTokenMiddleware,
} from "../controllers/UserController";

import { imageUpload } from "../helpers/imageUpload";

const router = Router();

router.post("/register", validateRegisterMiddleware, UserController.register);
router.post("/login", validateLoginMiddleware, UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch(
  "/edit/:id",
  validateUpdateMiddleware,
  verifyTokenMiddleware,
  imageUpload.single("image"),
  UserController.editUser
);

export default router;
