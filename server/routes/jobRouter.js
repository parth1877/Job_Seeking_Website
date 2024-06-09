import express from "express"
import jobController from "../controller/jobController.js"
import isAuthorised from "../middlewares/Auth.js"


const router = express.Router();

router.get("/getAlljobs",isAuthorised,jobController.getAllJobs)
router.post("/postJob",isAuthorised,jobController.createJob)
router.get("/myjobs",isAuthorised,jobController.getMyJobs)
router.put("/updateJob/:id",isAuthorised,jobController.updateJob)
router.delete("/deleteJob/:id",isAuthorised,jobController.deleteJob)
router.get("/:id",isAuthorised,jobController.getSingleJob)




export default router