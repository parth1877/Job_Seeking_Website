import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import endpoints from '../../../utils/apiEndpoints';

const Application = () => {
  const [Data, setData] = useState({ name: "", email: "", coverLetter: "", phone: "", address: "",resume:null });

  const {isAuthorized,user} = useContext(Context)

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const resume = e.target.files[0];
    setData((prevData) => ({
      ...prevData,
      resume: resume,
    }));
  };
  

  const {id} = useParams();

  const handleApplication = async (e)=>{
    e.preventDefault()
    const formdata = new FormData();
    formdata.append("name",Data.name)
    formdata.append("email",Data.email)
    formdata.append("coverLetter",Data.coverLetter)
    formdata.append("phone",Data.phone)
    formdata.append("address",Data.address)
    formdata.append("resume",Data.resume)
    formdata.append("jobID",id)

    try {
      const res = await axios.post(`${endpoints.APPLICATION_ENDPOINT}/post`,formdata,{
        withCredentials:true,
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      
      setData({ name: "", email: "", coverLetter: "", phone: "", address: "",resume:null });
      toast.success(res.data.message)
      setTimeout(() => {
        navigate("/job/getAll");
      }, 1000)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleData = (e)=>{
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  if(!isAuthorized || user && user.role === "EMPLOYEE"){
    navigate("/")
  }

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <input
            type="text"
            placeholder="Your Name"
            name='name'
            value={Data.name}
            onChange={handleData}
          />
          <input
            type="email"
            placeholder="Your Email"
            name='email'
            value={Data.email}
            onChange={handleData}
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            name='phone'
            value={Data.phone}
            onChange={handleData}
          />
          <input
            type="text"
            placeholder="Your Address"
            name='address'
            value={Data.address}
            onChange={handleData}
          />
          <textarea
            placeholder="CoverLetter..."
            name='coverLetter'
            value={Data.coverLetter}
            onChange={handleData}
          />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select Resume
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit">Send Application</button>
        </form>
      </div>
    </section>
  )
}

export default Application