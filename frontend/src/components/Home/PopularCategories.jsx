import React from 'react'
import categories from '../../../categories'

const PopularCategories = () => {
  return (
    <div className='categories'>
      <h3>Popular Categories</h3>
      <div className="banner">
        {
          categories.map((element)=>{
            return(
              <div className="card" key={element.id}>
                <div className="icon">{<element.icon/>}</div>
                <div className="text">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default PopularCategories