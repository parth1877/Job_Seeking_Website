import cloudinary from "cloudinary"
import { config as dotenvConfig } from "dotenv"

dotenvConfig()

export const connect_cloudinary = async () =>{
    try {
        await cloudinary.v2.config({
            cloud_name:process.env.Cloudinary_client,
            api_key: process.env.API_KEY,
            api_secret:process.env.API_SECRET
        })
        console.log("Connected to cloudinary")
    } catch (error) {
        console.log(error)
    }
}

