const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth-controllers");
const signUpSchema = require("../validators/auth_validator");
const validet = require("../middleware/valid_middleware");

router.route("/").get(authcontroller.home);
router.route("/register").post(validet(signUpSchema), authcontroller.register);
router.route("/login").post(authcontroller.login);

module.exports = router;
