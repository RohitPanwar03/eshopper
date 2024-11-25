import express from "express";
import { RegisterController, loginController, testController } from "../Controller/authController.js";
import { isAdmin, requireSignIn } from "../Middleware/authMiddleware.js";

const router = express.Router();

// REGISTER ROUTE
router.post("/register", RegisterController)

// LOGIN ROUTE
router.post("/login", loginController)

// TEST ROUTE
router.get("/test", requireSignIn, isAdmin, testController)


// PROTECTED USER DASHBOARD ROUTE
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})


// PROTECTED ADMIN DASHBOARD ROUTE
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})


export default router