import express from "express"
import userController from "../controller/userController.js"
import isAuthorised from "../middlewares/Auth.js"

const router = express.Router();

router.post("/register",userController.signUp)
router.post("/login",userController.Login)
router.get("/logout",isAuthorised,userController.Logout)

export default router;