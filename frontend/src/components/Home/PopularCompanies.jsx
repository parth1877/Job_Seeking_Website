import React from 'react'
import companies from '../../../companies'
const PopularCompanies = () => {
  return (
    <div className='companies'>
      <div className="container">
        <h3>Top Companies</h3>
        <div className="banner">
          {
            companies.map((element)=>{
              return(
                <div className="card" key={element.id}>
                  <div className="content">
                    <div className="icon">{<element.icon/>}</div>
                    <div className="text">
                      <p>{element.title}</p>
                      <p>{element.location}</p>
                    </div>
                  </div>
                  
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default PopularCompanies