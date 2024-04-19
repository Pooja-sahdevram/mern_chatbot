const { Router } = require("express");
const { getAllUsers, userSignup, userLogin, verifyUser, userLogout } = require("../controllers/user-controller");
const {
    loginValidator,
    signupValidator,
    validate,
  } = require("../utils/validator");
const {verifyToken} = require("../utils/token-manager")

const userRoutes = Router();

userRoutes.get('/', getAllUsers)
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);

module.exports = {
    userRoutes
}