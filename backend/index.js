import express from "express"
import {config as dotenvConfig} from "dotenv"
import {connect_cloudinary} from "./config/cloudinary.js";
import cookieparser from "cookie-parser"
import fileUpload from "express-fileupload";

dotenvConfig();

const PORT = process.env.PORT || 5000;


const app = express();

app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}))
connect_cloudinary()

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})

