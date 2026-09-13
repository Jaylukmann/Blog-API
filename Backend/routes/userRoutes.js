import express from "express";


import validateRegistration from "../validators/validateRegistration.js";
import validateLogin from "../validators/validateLogin.js";

import {
  registerUserController,
  loginUserController
} from "../controllers/userController.js";

import { uploadFile } from "../middlewares/uploadFile.js";

const router = express.Router();

router.post(
  "/register",
  uploadFile().single("image"),
  validateRegistration,
  registerUserController
);

router.post(
  "/login",
  validateLogin,
  loginUserController
);

export default router;