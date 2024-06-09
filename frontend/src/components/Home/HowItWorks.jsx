import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className='howitworks'>
      <div className='container'>
        <h3>How This Works</h3>
        <div className='banner'>
          <div className='card'>
            <FaUserPlus />
            <p>Create Account</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, 
              magnam fugiat ullam quas deleniti commodi!</p>
          </div>

          

          <div className='card'>
            <MdFindInPage />
            <p>Find a Job/Post a Job</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, 
              magnam fugiat ullam quas deleniti commodi!</p>
          </div>

          <div className='card'>
            <IoMdSend />
            <p>Apply and Get Hired</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, 
              magnam fugiat ullam quas deleniti commodi!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
