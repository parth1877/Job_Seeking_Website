import React from 'react'
import { Context } from '../../main';
import { useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaRegUser, FaEnvelope, FaPencilAlt } from 'react-icons/fa';
import { FaPhoneFlip } from 'react-icons/fa6';
import endpoints from '../../../utils/apiEndpoints';

const Login = () => {

  const [Data, setData] = useState({email: "", password: ""});
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const [passwordVisibility, setPasswordVisibility] = useState(false);


  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${endpoints.USER_ENDPOINT}/login`, Data, {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        }
      });
    
      toast.success(res.data.message);
      setData({email: "", password: ""});
      setIsAuthorized(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Login failed");
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
    <div>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <img src='/JobZeelogo.png' alt='logo' />
            <h3>Login to your account</h3>
          </div>

          <form onSubmit={handleRegister}>

            

            

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
              <label>Password</label>
              <div>
                <input type={passwordVisibility ? "text" : "password"} name="password" value={Data.password} onChange={handleForm} />
                <div onClick={() => setPasswordVisibility(!passwordVisibility)} className='Icon'>
                  {passwordVisibility ? <FaEye /> : <FaEyeSlash />}
                </div>
                
              </div>
            </div>

            <button type='submit'>Login</button>
            <Link to={"/register"}>Register</Link>
          </form>
        </div>

        <div className="banner">
          <img src='/register.png' alt='register' />
        </div>
      </div>
    </div>
  )
}

export default Login