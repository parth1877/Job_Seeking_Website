import express from "express"
import {config as dotenvConfig} from "dotenv"
import {connect_cloudinary} from "./config/cloudinary.js";
import cookieparser from "cookie-parser"
import fileUpload from "express-fileupload";
import userRoutes from "./routes/userRoutes.js"
import jobRoutes from "./routes/jobRouter.js"
import applicationRoutes from "./routes/applictionRouter.js"
import cors from "cors"

dotenvConfig();

const PORT = process.env.PORT || 5000;




const app = express();

app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
);


connect_cloudinary()
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))


app.use("/api/v1/user",userRoutes)
app.use("/api/v1/jobs",jobRoutes)
app.use("/api/v1/application",applicationRoutes)

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})

