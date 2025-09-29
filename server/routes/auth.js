const express = require("express");
const authcontollers = require("../controllers/auth-controller")
const validate = require("../zod-models/validate");
const validator = require("../middlewares/validator")

const router = express.Router();

router.route("/").get((req, res) => {
    res.send("This is home.");
});

router.route("/login").get((req, res) => {
    res.send("This is login.");
}).post(validator(validate.loginSchema), authcontollers.login);

router.route("/register").get((req, res) => {
    res.send("This is register.");
}).post(validator(validate.registerSchema), authcontollers.register);

module.exports = router;