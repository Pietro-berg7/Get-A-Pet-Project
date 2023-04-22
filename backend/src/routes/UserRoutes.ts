import { Router } from "express";

import {
  UserController,
  validateLoginMiddleware,
  validateRegisterMiddleware,
} from "../controllers/UserController";

const router = Router();

router.post("/register", validateRegisterMiddleware, UserController.register);
router.post("/login", validateLoginMiddleware, UserController.login);

export default router;
