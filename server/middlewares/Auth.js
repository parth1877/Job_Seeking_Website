import jwt from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";
import prisma from "../config/prismaConnect.js";

dotenvConfig();

const isAuthorised = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized"
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await prisma.user.findUnique({
                where:{
                    id:decoded.id
                }
            
            })

            req.user.password = "";
            next(); 
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                success: false,
                message: "Token verification failed"
            });
        }
    } catch (error) {
        console.error("Error in isAuthorised middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

export default isAuthorised;
