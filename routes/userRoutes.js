const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
   
} = require("../controllers/userControllers.js");

const  validateRegistration  = require("../middlewares/validateRegistration.js");
 const  validateLogin  = require("../middlewares/validateLogin.js");


router.post("/register", validateRegistration, registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;