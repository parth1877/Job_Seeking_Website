import express from "express"
import applicationContoller from "../controller/applicationContoller.js"
import isAuthorised from "../middlewares/Auth.js"


const router = express.Router();

router.get("/employee/getAll",isAuthorised,applicationContoller.employeegetApplications)
router.get("/jobseeker/getAll",isAuthorised,applicationContoller.jobseekergetAllapplications)
router.delete("/delete/:id",isAuthorised,applicationContoller.jobseekerDeleteApplication)
router.post("/post",isAuthorised,applicationContoller.createApplication)

export default router