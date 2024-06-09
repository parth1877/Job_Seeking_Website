import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import endpoints from '../../../utils/apiEndpoints';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${endpoints.JOB_ENDPOINT}/getAlljobs`, { withCredentials: true });
        const data = await res.data;
        setJobs(data.jobs);
      } catch (error) {
        console.log(error);
      }
    };

    if (!isAuthorized) {
      navigate("/login");
    } else {
      fetchJobs();
    }
  }, [isAuthorized, navigate]);

  return (
    <div>
      <section className="jobs">
        <div className="container">
          <h1>Available Jobs</h1>
          <div className="banner">
            {
              jobs && jobs.map((ele) => (
                <div className="card" key={ele.id}>
                  <p>{ele.title}</p>
                  <p>{ele.category}</p>
                  <p>{ele.country}</p>
                  <Link to={`/job/${ele.id}`}>Job Details</Link>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Jobs;
