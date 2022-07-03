import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Signin.css'
const Signin = () => {
  const [fields, setFields] = useState({
    email: '',
    password: '',
  })
  const handleInputChange = (e) => {
    const name = e.target.getAttribute('name')
    const value = e.target.value
    setFields((fields) => {
      return { ...fields, [name]: value }
    })
  }
  const handleRegister = () => {}
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
        <div className='inpcover' onChange={handleInputChange}>
          <div
            style={{
              color: 'white',
              fontFamily: 'Courier New',
              marginBottom: '50px',
            }}
          >
            <p>
              <label style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                Welcome Back!
              </label>
            </p>
          </div>

          <div>
            <input
              className='input'
              name='email'
              defaultValue={fields.email}
              placeholder='Enter your email'
            />
          </div>
          <div>
            <input
              className='input'
              name='password'
              type='password'
              placeholder='Enter your password'
              defaultValue={fields.password}
            />
          </div>

          <div>
            <button className='loginbtn' onClick={handleRegister}>
              Login
            </button>
          </div>
          <p style={{ margin: '20px', color: 'white', fontSize: '1.1rem' }}>
            <label>Don't have an account? </label>
            <Link
              style={{ textDecoration: 'none', color: 'blue' }}
              to='/register'
            >
              <label>Sign up</label>
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signin
