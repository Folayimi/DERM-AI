import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

const Register = () => {
  const [fields, setFields] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
        <div className='inputcover' onChange={handleInputChange}>
          <div
            style={{
              color: 'white',
              fontFamily: 'Courier New',
              marginBottom: '50px',
            }}
          >
            <p>
              <label style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                Welcome on board!
              </label>
            </p>
            <p style={{ marginTop: '10px' }}>
              <label>Let's Help You Setup Your Account</label>
            </p>
          </div>
          <div>
            <input
              className='input'
              name='fullname'
              defaultValue={fields.fullName}
              placeholder='Enter your full name'
            />
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
            <input
              className='input'
              name='fullname'
              type='password'
              placeholder='Confirm Password'
              defaultValue={fields.fullName}
            />
          </div>
          <div>
            <button className='registerbtn' onClick={handleRegister}>
              Register
            </button>
          </div>
          <p style={{ margin: '20px', color: 'white', fontSize: '1.1rem' }}>
            <label>Already have an account? </label>
            <Link
              style={{ textDecoration: 'none', color: 'blue' }}
              to='/signin'
            >
              <label>Sign in</label>
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register
