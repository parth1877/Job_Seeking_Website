import prisma from "../config/prismaConnect.js"

const getAllJobs = async(req,res)=>{
    try {
        const jobs = await prisma.job.findMany({
            where:{
                expired:false
            }
        })

        return res.status(200).json({
            success:true,
            jobs
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


const createJob = async (req,res) =>{
    try {
        const {role} = req.user;
        const {id} = req.user


        console.log(id)
        if(role === "JOBSEEKER"){
            return res.status(400).json({
                success:false,
                message:"You are not allowed to access these resources"
            })
        }

        const {title,description,category,country,city,location,
            fixedSalary,salaryFrom,salaryTo} = req.body;

            console.log(req.body)

        if( !title || !description || !category || !country || !city  || !location){
            return res.status(400).json({
                success:false,
                message:"Some fields are missing"
            })
        }

        

        if((!salaryFrom || !salaryTo) && !fixedSalary){
            return res.status(400).json({
                success:false,
                message:"Either provide fixed salary or salary range"
            })
        }

        if(salaryFrom && salaryTo && fixedSalary){
            return res.status(400).json({
                success:false,
                message:"Either provide fixed salary or salary range"
            })
        }

        

        const createJob = await prisma.job.create({
            data: {
              title: title,
              description: description,
              category: category,
              country: country,
              city: city,
              location:location,
              fixedSalary: fixedSalary,
              salaryFrom: salaryFrom,
              salaryTo: salaryTo,
              
              postedBy: {
                connect: { id: id } 
              }
            }
          });

          return res.status(200).json({
                success:true,
                message:"Job posted successfully",
                createJob
          })
          


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const getMyJobs = async (req,res)=>{
    try {
        const {role} = req.user
        const {id} = req.user
        
        if(role === "JOBSEEKER"){
            return res.status(400).json({
                success:false,
                message:"You are not allowed to access these resources"
            })
        }



        const myjobs = await prisma.user.findUnique({
            where:{
                id:id
            },
            select:{
                jobCreation:true
            }
        })

        
        return res.status(200).json({
            success:true,
            myjobs
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


const updateJob = async (req,res) =>{
    try {
        const {role} = req.user;
        
        
        if(role === "JOBSEEKER"){
            return res.status(400).json({
                success:false,
                message:"You are not allowed to access these resources"
            })
        }

        const {id} = req.params;
        const data = req.body;

        let job = await prisma.job.findUnique({
            where:{
                id:id
            }
        })

        if(!job){
            return res.status(404).json({
                success:false,
                message:"Oops!,Job not found"
            })
        }

        job = await prisma.job.update({
            where:{
                id:id
            },
            data:data
        })

        return res.status(200).json({
            success:true,
            job,
            message:"Job updated successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const deleteJob = async(req,res)=>{
    try {
        const {role} = req.user;
        
        
        if(role === "JOBSEEKER"){
            return res.status(400).json({
                success:false,
                message:"You are not allowed to access these resources"
            })
        }

        const {id} = req.params;

        let job = await prisma.job.findUnique({
            where:{
                id:id
            }
        })

        if(!job){
            return res.status(404).json({
                success:false,
                message:"Oops!,Job not found"
            })
        }


        await prisma.job.delete({
            where:{
                id:id
            }
        })

        return res.status(200).json({
            success:true,
            message:"Job deleted successfully"
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const getSingleJob = async(req,res)=>{
    try {
        const {id} = req.params;
        const job = await prisma.job.findUnique({
            where:{
                id:id
            }
        })

        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job not found"
            })
        }
        return res.status(200).json({
            success:true,
            data:job
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


const jobController = {getAllJobs,createJob,getMyJobs,updateJob,deleteJob,getSingleJob}

export default jobController