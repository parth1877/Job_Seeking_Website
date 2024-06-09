import React from 'react';
import details from '../../../data.js';

const HeroSection = () => {
  return (
    <div className='heroSection'>

      <div className='container'>

        <div className='title'>
          <h1>Find a job that suits</h1>
          <h1>your interest and skills</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Iste hic corporis eos quia? Delectus quidem id aspernatur vero culpa placeat, 
            tenetur iure, est fugit, temporibus in asperiores fugiat sed magni.
          </p>
        </div>

        <div className='image'>
          <img src='/heroS.jpg' alt='hero'/>
        </div>

      </div>

      <div className='details'>
        {
          
          details.map((element) => (
            
            <div className='card' key={element.id}>
              <div className='icon'>{<element.icon/>}</div>
              <div className='content'>
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  );
};

export default HeroSection;
