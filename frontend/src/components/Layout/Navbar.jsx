import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {GiHamburgerMenu} from "react-icons/gi"
import axios from 'axios'
import endpoints from '../../../utils/apiEndpoints'

const Navbar = () => {
    const [show,setShow] = useState(false)
    const {isAuthorized,setIsAuthorized,user} = useContext(Context)
    const navigateTo = useNavigate()

    const handleLogout = async()=>{
        try {
            const res = await axios.get(`${endpoints.USER_ENDPOINT}/logout`,{withCredentials:true})
            
            toast.success(res.data.msg)
            setIsAuthorized(false)
            navigateTo("/login")
        } catch (error) {
            // toast.error(error.res.data.message)
            setIsAuthorized(true)
        }
    }

  return (
    <nav className={isAuthorized ? "navbarShow":"navbarHide"}>
        <div className='container'>
            <div className="logo">
                <img src='JobZee-logos__white.png' alt='logo'></img>
            </div>

            <ul className={!show ? "menu":"show-menu menu"}>

                <li>
                    <Link to={"/"}>Home</Link>
                </li>

                <li>
                    <Link to={"/job/getAll"} onClick={()=> setShow(false)}>ALL JOBS</Link>
                </li>


                <li>
                    <Link to={"/application/me"} onClick={()=> setShow(false)}>
                        {
                            user && user.role === "EMPLOYEE" ? "APPLICANT'S APPLICATION":"MY APPLICATIONS"
                        }
                    </Link>
                </li>

                {
                    user && user.role === "EMPLOYEE" ? (
                        <>
                            <li>
                                <Link to={"/job/post"} onClick={()=> setShow(false)}>POST NEW JOB</Link>
                            </li>
                            <li>
                                <Link to={"/job/me"} onClick={()=> setShow(false)}>VIEW YOUR JOBS</Link>
                            </li>
                        </>
                    ):(<>
                    </>)
                }

                <button onClick={handleLogout}>LOGOUT</button>

            </ul>

            <div className='hamburger'>
                <GiHamburgerMenu onClick={()=> setShow(!show)}/>
            </div>

            
        </div>
    </nav>
  )
}

export default Navbar