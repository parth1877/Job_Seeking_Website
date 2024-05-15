import express from "express"
import {config as dotenvConfig} from "dotenv"
import {connect_cloudinary} from "./config/cloudinary.js";
import cookieparser from "cookie-parser"
import fileUpload from "express-fileupload";
import userRoutes from "./routes/userRoutes.js"
import jobRoutes from "./routes/jobRouter.js"


dotenvConfig();

const PORT = process.env.PORT || 5000;




const app = express();

app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

connect_cloudinary()
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}))


app.use("/api/v1/user",userRoutes)
app.use("/api/v1/jobs",jobRoutes)

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})

