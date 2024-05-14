import jwt from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";

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
            const verification = jwt.verify(token, process.env.JWT_SECRET);
            next(); 
        } catch (error) {
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
