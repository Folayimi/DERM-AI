import { React, useEffect, useState } from 'react'
import './Home.css'
import {Link} from 'react-router-dom'

const Services = () => {  
  return (
    <>
      <div className="services">
        <div className="intro">
            <p>Are You Keen on Germinating a particular Crop?</p>
            <p>We are here to help you</p>
        </div>        
          <Link className="btn" to="/survey">
            <div> Get Started</div>
          </Link>            
      </div>
    </>
  )
}

export default Services
