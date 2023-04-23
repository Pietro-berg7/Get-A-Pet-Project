import { Router } from "express";

import {
  UserController,
  validateLoginMiddleware,
  validateRegisterMiddleware,
} from "../controllers/UserController";

const router = Router();

router.post("/register", validateRegisterMiddleware, UserController.register);
router.post("/login", validateLoginMiddleware, UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);

export default router;
