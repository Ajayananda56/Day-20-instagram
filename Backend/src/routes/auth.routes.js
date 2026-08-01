const express = require("express");
const authController = require("../controllers/auth.controllers");
const authRouter = express.Router();
const identifyUser = require("../middlewares/auth.middleware");
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");

//POST /api/auth/register
authRouter.post("/register", authController.registerController );

//POST /api/auth/login
authRouter.post("/login", authController.loginController );

// GET/api/auth/get-me
authRouter.get("/get-me", identifyUser,  authController.getMeController);

// GET /api/auth/google
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// GET /api/auth/google/callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign(
      { id: req.user._id, username: req.user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Redirect to frontend home page
    res.redirect("http://localhost:5173/");
  }
);

module.exports = authRouter;