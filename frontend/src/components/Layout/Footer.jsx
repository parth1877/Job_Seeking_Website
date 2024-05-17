import React,{useContext} from 'react'
import { Context } from '../../main'
import { Link } from 'react-router-dom'
import { FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri"


const Footer = () => {

  const { isAuthorized } = useContext(Context)


  return (
    <footer className={isAuthorized ? "footerShow":"footerHide"}>
      <div>&copy; </div>
      <div>
        <Link to={"/"} target='_blanck'><FaFacebook/></Link>
        <Link to={"/"} target='_blanck'><FaLinkedin/></Link>
        <Link to={"/"} target='_blanck'><FaLinkedin/></Link>
        <Link to={"/"} target='_blanck'><RiInstagramFill/></Link>
      </div>
    </footer>
  )
}

export default Footer