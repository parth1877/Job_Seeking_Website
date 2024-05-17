import React, { useContext, useEffect } from 'react'
import "./App.css"
import { Context } from "./main"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Navbar from "./components/Layout/Navbar"
import Footer from "./components/Layout/Footer"
import Jobs from "./components/Job/Jobs"
import JobDetails from "./components/Job/JobDetails"
import MyJobs from "./components/Job/MyJobs"
import PostJob from "./components/Job/PostJob"
import Application from "./components/Application/Application"
import MyApplication from "./components/Application/MyApplication"
import NotFound from "./components/NotFound/NotFound"
import Home from "./components/Home/Home"
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const App = () => {


  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context)

  useEffect(() => {

    const fetchuser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/user/getuser", { withCredentials: true })
        setUser(res.data.user)
        setIsAuthorized(true)
      } catch (error) {
        setIsAuthorized(false)
      }
    }

    fetchuser();

  }, [isAuthorized])


  

  return (
    <div>
      <Router>
        <Navbar />

        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/job/getAll' element={<Jobs />} />
          <Route path='/job/:id' element={<JobDetails />} />
          <Route path='/job/post' element={<PostJob />} />
          <Route path='/job/me' element={<MyJobs />} />
          <Route path='/application/:id' element={<Application />} />
          <Route path='/application/me' element={<MyApplication />} />
          <Route path='*' element={<NotFound />} />

        </Routes>

        <Footer />
        <Toaster />

      </Router>
    </div>
  )
}

export default App