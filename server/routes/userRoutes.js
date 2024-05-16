import express from "express"
import userController from "../controller/userController.js"
import isAuthorised from "../middlewares/Auth.js"

const router = express.Router();

router.post("/register",userController.signUp)
router.post("/login",userController.Login)
router.get("/logout",isAuthorised,userController.Logout)
router.get("/getuser",isAuthorised,userController.getUser)

export default router;