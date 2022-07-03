import { React, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './Home.css'

import Register from '../Register/Register'
import Signin from '../Signin/Signin'

const Home = ({ navRefList }) => {
  const { id } = useParams()

  useEffect(() => {
    // console.log(id)
  }, [id])

  return (
    <>
      <div className='homebg'>
        <div>
          <Link to='/signin'>
            <button className='signinbtn'>Sign in</button>
          </Link>
        </div>
        <div className='content1'>
          <p>
            Strengthening efforts to reduce the cancer burden, improving the
            quality of cancer detection and closing the care gap
          </p>
        </div>
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Link to='/register'>
            <button className='startbtn'>GET STARTED</button>
          </Link>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '0px',
            justifyContent: 'center',
          }}
        >
          <div className='dermimg'></div>
        </div>
      </div>
    </>
  )
}

export default Home
