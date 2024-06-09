import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../main';
import axios from 'axios';
import endpoints from '../../../utils/apiEndpoints';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({});

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`${endpoints.JOB_ENDPOINT}/${id}`, { withCredentials: true });
        setJob(res.data.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    if (!isAuthorized) {
      navigate("/login");
    } else {
      fetchJobDetails();
    }
  }, []);

  return (
    <div>
      <div className="jobDetail page">
        <div className="container">
          <h2>Job Detail</h2>
          <div className="banner">
            <p>
              Title: <span>{job.title}</span>
            </p>
            <p>
              Category: <span>{job.category}</span>
            </p>
            <p>
              Country: <span>{job.country}</span>
            </p>
            <p>
              City: <span>{job.city}</span>
            </p>
            <p>
              Location: <span>{job.location}</span>
            </p>
            <p>
              Description: <span>{job.description}</span>
            </p>
            <p>
              Job posted on: <span>{job.jobPostedOn}</span>
            </p>
            <p>
              Salary: {job.fixedSalary ? (
                <span>{job.fixedSalary}</span>
              ) : (
                <span>
                  {job.salaryFrom} - {job.salaryTo}
                </span>
              )}
            </p>
            <p>
              {user && user.role === "EMPLOYEE" ? null : (
                <Link to={`/application/${job.id}`}>Apply for this job</Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
