import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

const Register = () => {
  return (
    <>
      <div className='regbg'>
        <div
          style={{
            position: 'fixed',
            top: '0px',
            left: '-70px',
            borderRadius: '50%',
            padding: '70px',
            margin: 'auto',
            width: 'fit-content',
            backgroundColor: 'rgba(0,0,255,0.6)',
          }}
        ></div>
        <div
          style={{
            position: 'fixed',
            top: '-70px',
            left: '0px',
            borderRadius: '50%',
            padding: '70px',
            margin: 'auto',
            width: 'fit-content',
            backgroundColor: 'rgba(0,0,255,0.6)',
          }}
        ></div>
      </div>
    </>
  )
}

export default Register
