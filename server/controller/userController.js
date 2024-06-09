import prisma from "../config/prismaConnect.js"
import zod from "zod"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import {config as dotenvConfig} from "dotenv"



dotenvConfig()




const schema = zod.object({
    name:zod.string().min(3),
    email:zod.string().email(),
    password:zod.string().min(8),
    role:zod.enum(["EMPLOYEE","JOBSEEKER"])
})

const signUp = async(req,res) =>{
    try {
        const {name,email,phoneNumber,password,role} = req.body

        const checkValidation = schema.safeParse({name,email,phoneNumber,password,role});

        

        console.log(checkValidation)

        if(checkValidation.success == false){
            return res.status(500).json({
                success:false,
                message:"Please provide valid input"
            })
        }

        const user = await prisma.user.findUnique(
            {
                where:{
                    email:email
                }
            }
        );



        if(user){
            return res.status(500).json({
                success:false,
                message:"Email already registered"
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = await prisma.user.create({
            data:{
                name:name,
                email:email,
                phoneNumber:phoneNumber,
                password:hashedPassword,
                role:role
            }
        })

        const token = jwt.sign({id:newUser.id},process.env.JWT_SECRET,{
            expiresIn:"2d"
        })



        return res.status(200).cookie("token",token,{
            httponly:true , 
            expires:new Date(Date.now() + 2*24*60*60*1000),
            secure:true,
            sameSite:"None"}
        ).json({
            success:true,
            data:newUser,
            message:"You are registered successfully"
        })






    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const Login = async (req,res) =>{
    try {
        const {email,password} = req.body;
        const user = await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        console.log({email,password})

        if(!user){
            return res.status(500).json({
                success:false,
                message:"User does not exist"
            })
        }

        const compare = await bcryptjs.compare(password,user.password);

        

        if(compare == false){
            return res.status(500).json({
                success:false,
                message:"Enter correct password"
            })
        }

        const token =  jwt.sign({id:user.id},process.env.JWT_SECRET,{
            expiresIn:"2d"
        })

        user.password = ""

        const options = {
            httponly:true,
            secure:true,
            sameSite:"None",
            expires:new Date(Date.now() 
            + 2*24*60*60*1000)
        }

        return res.status(200).cookie("token",token,options
        ).json({
            success:true,
            data:user,
            message:"Logged in successfully"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


const Logout = (req, res) => {
    try {

        
        return res.cookie("token","",{expiresIn:new Date(Date.now()),secure:true,sameSite:"None"}).json({
            success:true,
            msg:"Logout successfully"
        })

    } catch (error) {
        
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

const getUser = async (req,res)=>{
    try {
        const user = req.user;

        return res.status(200).json({
            success:true,
            user
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}





const userController = {signUp,Login,Logout,getUser}

export default userController