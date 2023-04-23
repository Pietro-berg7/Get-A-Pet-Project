import { Router } from "express";

import {
  UserController,
  validateLoginMiddleware,
  validateRegisterMiddleware,
  verifyTokenMiddleware,
} from "../controllers/UserController";

const router = Router();

router.post("/register", validateRegisterMiddleware, UserController.register);
router.post("/login", validateLoginMiddleware, UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch("/edit/:id", verifyTokenMiddleware, UserController.editUser);

export default router;
