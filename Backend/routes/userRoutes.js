// import express from "express";
// const router = express.Router();

// import userControllers from "../controllers/userControllers.js";

// import  validateRegistration  from "../validators/validateRegistration.js";
//  import  validateLogin  from "../validators/validateLogin.js";


// router.post("/register", validateRegistration, userControllers.registerUser);
// router.post("/login", validateLogin, userControllers.loginUser);

// export default router;
//..................................................................................................
//..................................................................................................

import express from "express";
import  validateRegistration  from "../validators/validateRegistration.js";
 import  validateLogin  from "../validators/validateLogin.js";

import {
  registerUserController,
  loginUserController
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register",validateRegistration, registerUserController);

router.post("/login", validateLogin, loginUserController);

export default router;