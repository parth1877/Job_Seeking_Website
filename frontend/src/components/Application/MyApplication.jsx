import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import ResumeModel from './ResumeModel';
import endpoints from '../../../utils/apiEndpoints';

const MyApplication = () => {

  const [applications,setApplications] = useState([]);
  const [modalopen,setModalopen] = useState(false);
  const [imageURL,setImageURL] = useState("");
  const {isAuthorized,user} = useContext(Context)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.role === "EMPLOYEE") {
          const res = await axios.get(`${endpoints.APPLICATION_ENDPOINT}/employee/getAll`, { withCredentials: true });
          
          setApplications(res.data.applications);
          
        } else {
          const res = await axios.get(`${endpoints.APPLICATION_ENDPOINT}/jobseeker/getAll`, { withCredentials: true });
          const data = res.data.applications
        
          setApplications(data);
         
          
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
  
    fetchData();
  }, [isAuthorized]);
  

  if(!isAuthorized){
    navigate("/login")
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`${endpoints.APPLICATION_ENDPOINT}/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application.id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setImageURL(imageUrl);
    setModalopen(true);
  };

  const closeModal = () => {
    
    setModalopen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "JOBSEEKER" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element.id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element.id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalopen && (
        <ResumeModel imageUrl={imageURL} onClose={closeModal} />
      )}
    </section>
  );
};


const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {
            element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resumeUrl}
            alt="resume"
            onClick={() => openModal(element.resumeUrl)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element.id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resumeUrl}
            alt="resume"
            onClick={() => openModal(element.resumeUrl)}
          />
        </div>
      </div>
    </>
  );
};

export default MyApplication;
