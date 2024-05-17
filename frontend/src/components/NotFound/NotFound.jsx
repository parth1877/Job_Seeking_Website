import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='page notfound'>
      <div className='content'>
        <img src='/notfound.png' alt='notfound'></img>
        <Link to={"/"}>Return to home page</Link>
      </div>
    </section>
  )
}

export default NotFound