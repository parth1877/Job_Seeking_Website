import prisma from "../config/prismaConnect.js"
import cloudinary from "cloudinary"

const employeegetApplications = async (req, res) => {
    try {
        const { role } = req.user;



        
        if (role === "JOBSEEKER") {
            return res.status(400).json({
                success: false,
                message: "You are not allowed to access these resources"
            })
        }

        const { id } = req.user

        const applications = await prisma.application.findMany({
            where: {
                employeeID: id
            }
        })

        return res.status(200).json({
            success: true,
            applications
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const jobseekergetAllapplications = async (req, res) => {
    try {
        const { role } = req.user;




        if (role === "EMPLOYEE") {
            return res.status(400).json({
                success: false,
                message: "You are not allowed to access these resources"
            })
        }

        const { id } = req.user

        const applications = await prisma.application.findMany({
            where: {
                applicantID: id
            }
        })

        return res.status(200).json({
            success: true,
            applications
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }


}


const jobseekerDeleteApplication = async (req, res) => {
    try {
        const { role } = req.user;




        if (role === "EMPLOYEE") {
            return res.status(400).json({
                success: false,
                message: "You are not allowed to access these resources"
            })
        }

        const { id } = req.params
        

        console.log(id)

        const application = await prisma.application.findUnique({
            where: {
                id:id
            }
        })

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            })
        }

        await prisma.application.delete({
            where: {
                id: id
            }
        })

        return res.status(200).json({
            success:true,
            message:"Application deleted successfully"
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }


}

const createApplication = async (req,res)=>{
    try {
        const { role } = req.user;

        if (role === "EMPLOYEE") {
            return res.status(400).json({
                success: false,
                message: "You are not allowed to access these resources"
            })
        }

        console.log(req.files)

        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(500).json({
                success:false,
                message:"Resume required"
            })
        }

        const resume = req.files.resume

        

        const allowedFormats = ["image/png","image/jpg","image/webp","image/jpeg"]

        if(!allowedFormats.includes(resume.mimetype)){
            return res.status(500).json({
                success:false,
                message:"Invalid file type,please upload png,jpg,webp,jpeg format"
            })
        }

        const cloudinaryRes = await cloudinary.uploader.upload(
            resume.tempFilePath
        )

        if(!cloudinaryRes || cloudinaryRes.error){
            console.log(cloudinary.error)
            console.log("Unknown cloudinary error")
            return res.status(500).json({
                success:false,
                message:"Unable to upload on cloudinary"
            })
        }

        const {name,email,coverLetter,phone,address,jobID} = req.body;
        const applicantID = req.user.id

        console.log(applicantID)

        if(!jobID){
            return res.status(404).json({
                success:false,
                message:"Job not found"
            })
        }

        let jobDetails = await prisma.job.findUnique({
            where:{
                id:jobID
            }
        })

        if(!jobDetails){
            return res.status(404).json({
                success:false,
                message:"Job not found"
            })
        }

        jobDetails = await prisma.job.findUnique({
            where:{
                id:jobID
            },
            select:{
                postedBy:{
                    select:{
                        id:true
                    }
                }
            }
        })

        console.log(jobDetails)

        const employeeID = jobDetails.postedBy.id;

        console.log("Eployeeid:",employeeID)

        console.log({name,coverLetter,phone,address,applicantID,employeeID,resume})

        if(!name || !email || !coverLetter || !phone || !address || !applicantID || !employeeID || !resume){
            return res.status(500).json({
                success:false,
                message:"All fields are required"
            })
        }

        const application = await prisma.application.create({
            data:{
                name:name,
                email:email,
                coverLetter:coverLetter,
                applicantID:applicantID,
                employeeID:employeeID,
                phone:phone,
                address:address,
                applicantrole:"JOBSEEKER",
                employeerole:"EMPLOYEE",
                resumePublicID:cloudinaryRes.public_id,
                resumeUrl:cloudinaryRes.secure_url
            }
        })

        console.log(application)

        return res.status(200).json({
            success:true,
            message:"Application submitted successfully",
            application
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const applicationController = {jobseekerDeleteApplication,employeegetApplications,jobseekergetAllapplications,
    createApplication
}


export default applicationController