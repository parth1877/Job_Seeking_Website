import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import endpoints from '../../../utils/apiEndpoints';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [editingmode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(`${endpoints.JOB_ENDPOINT}/myjobs`, { withCredentials: true });
        setJobs(data.myjobs.jobCreation);
      } catch (error) {
        toast.error(error.response.data.message);
        setJobs([]);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "EMPLOYEE")) {
      navigate("/");
    }
  }, [isAuthorized, user, navigate]);

  const handleEnableEditMode = (jobID) => {
    setEditingMode(jobID);
  };

  const handleDisableEditMode = () => {
    setEditingMode(null);
  };

  const updateJob = async (jobID) => {
    const updateJob = jobs.find(job => job.id === jobID);
    try {
      const res = await axios.put(`${endpoints.JOB_ENDPOINT}/updateJob/${jobID}`, updateJob, { withCredentials: true });
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteJob = async (jobID) => {
    try {
      const res = await axios.delete(`${endpoints.JOB_ENDPOINT}/deleteJob/${jobID}`, { withCredentials: true });
      toast.success(res.data.message);
      setJobs(prevJobs => prevJobs.filter(job => job.id !== jobID));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (jobID, field, value) => {
    setJobs(prevJobs => prevJobs.map(job =>
      job.id === jobID ? { ...job, [field]: value } : job
    ));
  };

  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h1>Your Posted Jobs</h1>
          {jobs.length > 0 ? (
            <div className="banner">
              {jobs.map((element) => (
                <div className="card" key={element.id}>
                  <div className="content">
                    <div className="short_fields">
                      <div>
                        <span>Title:</span>
                        <input
                          type="text"
                          disabled={editingmode !== element.id}
                          value={element.title}
                          onChange={(e) =>
                            handleInputChange(element.id, "title", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <span>Country:</span>
                        <input
                          type="text"
                          disabled={editingmode !== element.id}
                          value={element.country}
                          onChange={(e) =>
                            handleInputChange(element.id, "country", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <span>City:</span>
                        <input
                          type="text"
                          disabled={editingmode !== element.id}
                          value={element.city}
                          onChange={(e) =>
                            handleInputChange(element.id, "city", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <span>Category:</span>
                        <select
                          value={element.category}
                          onChange={(e) =>
                            handleInputChange(element.id, "category", e.target.value)
                          }
                          disabled={editingmode !== element.id}
                        >
                          <option value="Graphics & Design">Graphics & Design</option>
                          <option value="Mobile App Development">Mobile App Development</option>
                          <option value="Frontend Web Development">Frontend Web Development</option>
                          <option value="MERN Stack Development">MERN STACK Development</option>
                          <option value="Account & Finance">Account & Finance</option>
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Video Animation">Video Animation</option>
                          <option value="MEAN Stack Development">MEAN STACK Development</option>
                          <option value="MEVN Stack Development">MEVN STACK Development</option>
                          <option value="Data Entry Operator">Data Entry Operator</option>
                        </select>
                      </div>
                      <div>
                        <span>Salary:</span>
                        {element.fixedSalary ? (
                          <input
                            type="number"
                            disabled={editingmode !== element.id}
                            value={element.fixedSalary}
                            onChange={(e) =>
                              handleInputChange(element.id, "fixedSalary", e.target.value)
                            }
                          />
                        ) : (
                          <div>
                            <input
                              type="number"
                              disabled={editingmode !== element.id}
                              value={element.salaryFrom}
                              onChange={(e) =>
                                handleInputChange(element.id, "salaryFrom", e.target.value)
                              }
                            />
                            <input
                              type="number"
                              disabled={editingmode !== element.id}
                              value={element.salaryTo}
                              onChange={(e) =>
                                handleInputChange(element.id, "salaryTo", e.target.value)
                              }
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <span>Expired:</span>
                        <select
                          value={element.expired}
                          onChange={(e) =>
                            handleInputChange(element.id, "expired", e.target.value)
                          }
                          disabled={editingmode !== element.id}
                        >
                          <option value={true}>TRUE</option>
                          <option value={false}>FALSE</option>
                        </select>
                      </div>
                    </div>
                    <div className="long_field">
                      <div>
                        <span>Description:</span>
                        <textarea
                          rows={5}
                          value={element.description}
                          disabled={editingmode !== element.id}
                          onChange={(e) =>
                            handleInputChange(element.id, "description", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <span>Location:</span>
                        <textarea
                          value={element.location}
                          rows={1}
                          disabled={editingmode !== element.id}
                          onChange={(e) =>
                            handleInputChange(element.id, "location", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="button_wrapper">
                    <div className="edit_btn_wrapper">
                      {editingmode === element.id ? (
                        <>
                          <button
                            onClick={() => updateJob(element.id)}
                            className="check_btn"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={handleDisableEditMode}
                            className="cross_btn"
                          >
                            <RxCross2 />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEnableEditMode(element.id)}
                          className="edit_btn"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => deleteJob(element.id)}
                      className="delete_btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You've not posted any job or maybe you deleted all of your jobs!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
