import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Home.css'

const Home = ({ navRefList }) => {
  const { id } = useParams()

  useEffect(() => {
    // console.log(id)
  }, [id])

  return (
    <>
      <div className='homebg'>
        <div className='content1'>
          <p>
            Strengthening efforts to reduce the cancer burden, improving the
            quality of cancer detection and closing the care gap
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className='startbtn'>GET STARTED</button>
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
