import React, { useContext, useState } from 'react';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import endpoints from '../../../utils/apiEndpoints';

const PostJob = () => {
  const [Data, setData] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    location: "",
    fixedSalary: 0,
    salaryFrom: 0,
    salaryTo: 0
  });

  const navigate = useNavigate();

  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'fixedSalary' || name === 'salaryFrom' || name === 'salaryTo' ? parseFloat(value) : value;
    setData((prevData) => ({
      ...prevData,
      [name]: parsedValue
    }));
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${endpoints.JOB_ENDPOINT}/postjob`, Data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      toast.success(res.data.message);
     
      navigate("/"); 
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role !== "EMPLOYEE")) {
    navigate("/");
  }

  return (
    <div className='job_post page'>
      <div className="container">
        <h3>POST NEW JOB</h3>
        <form onSubmit={submitHandler}>
          <div className="wrapper">
            <input type='text' value={Data.title} name='title' onChange={handleJobPost} placeholder='Job Title' />
            <select value={Data.category} name='category' onChange={handleJobPost}>
              <option value="">Select Category</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Frontend Web Development">
                Frontend Web Development
              </option>
              <option value="MERN Stack Development">
                MERN STACK Development
              </option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Video Animation">Video Animation</option>
              <option value="MEAN Stack Development">
                MEAN STACK Development
              </option>
              <option value="MEVN Stack Development">
                MEVN STACK Development
              </option>
              <option value="Data Entry Operator">Data Entry Operator</option>
            </select>
          </div>

          <div className="wrapper">
            <input type='text' value={Data.country} name='country' onChange={handleJobPost} placeholder='Country' />
            <input type='text' value={Data.city} name='city' onChange={handleJobPost} placeholder='City' />
          </div>

          <input type='text' value={Data.location} name='location' onChange={handleJobPost} placeholder='Location' />

          <div className="salary_wrapper">
            <select value={salaryType} onChange={(e) => setSalaryType(e.target.value)} required>
              <option value="default">Select Salary Type</option>
              <option value="fixed">Fixed Salary</option>
              <option value="range">Salary Range</option>
            </select>
            {salaryType === "fixed" && (
              <input type='number' value={Data.fixedSalary} name='fixedSalary' onChange={handleJobPost} placeholder='Fixed Salary' />
            )}
            {salaryType === "range" && (
              <div>
                <input type='number' value={Data.salaryFrom} name='salaryFrom' onChange={handleJobPost} placeholder='Salary From' />
                <input type='number' value={Data.salaryTo} name='salaryTo' onChange={handleJobPost} placeholder='Salary To' />
              </div>
            )}
          </div>

          <textarea rows="10" value={Data.description} onChange={handleJobPost} name='description'></textarea>






          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
