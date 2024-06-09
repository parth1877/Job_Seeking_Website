import React, { useContext, useState } from 'react';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaRegUser, FaEnvelope, FaPencilAlt } from 'react-icons/fa';
import { FaPhoneFlip } from 'react-icons/fa6';
import { RiLock2Fill } from 'react-icons/ri';
import endpoints from '../../../utils/apiEndpoints';


const Register = () => {
  const [Data, setData] = useState({ name: "", email: "", password: "", phoneNumber: "", role: "" });
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handlelogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${endpoints.USER_ENDPOINT}/register`, Data, {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        }
      });
      console.log(res)
      toast.success(res.data.message);
      setData({email: "", password: ""});
      setIsAuthorized(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Registration failed");
    }
  };

  const handleForm = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <img src='/JobZeelogo.png' alt='logo' />
            <h3>Create a new account</h3>
          </div>

          <form onSubmit={handlelogin}>

            <div className="inputTag">
              <label>Register as</label>
              <div>
                <select name="role" value={Data.role} onChange={handleForm}>
                  <option value="">Select role</option>
                  <option value="EMPLOYEE">Employee</option>
                  <option value="JOBSEEKER">Job Seeker</option>
                </select>
                <div className='Icon'>
                  <FaRegUser />
                </div>
              </div>
            </div>

            <div className="inputTag">
              <label>Name</label>
              <div>
                <input type='text' name="name" value={Data.name} onChange={handleForm} />
                <div className='Icon'>
                  <FaPencilAlt />
                </div>
              </div>
            </div>

            <div className="inputTag">
              <label>Email</label>
              <div>
                <input type='email' name="email" value={Data.email} onChange={handleForm} />
                <div className='Icon'>
                  <FaEnvelope />
                </div>
              </div>
            </div>

            <div className="inputTag">
              <label>Phone</label>
              <div>
                <input type='tel' name="phoneNumber" value={Data.phoneNumber} onChange={handleForm} />
                <div className='Icon'>
                  <FaPhoneFlip />
                </div>
              </div>
            </div>

            <div className="inputTag">
              <label>Password</label>
              <div>
                <input type={passwordVisibility ? "text" : "password"} name="password" value={Data.password} onChange={handleForm} />
                <div onClick={() => setPasswordVisibility(!passwordVisibility)} className='Icon'>
                  {passwordVisibility ? <FaEye /> : <FaEyeSlash />}
                </div>
                
              </div>
            </div>

            <button type='submit'>Register</button>
            <Link to={"/login"}>Login</Link>
          </form>
        </div>

        <div className="banner">
          <img src='/login.png' alt='login' />
        </div>
      </div>
    </>
  );
}

export default Register;
