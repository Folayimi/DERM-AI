import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Signin.css'
const Signin = () => {
  const [fields, setFields] = useState({
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [validating, setValidating] = useState(false)
  const handleInputChange = (e) => {
    const name = e.target.getAttribute('name')
    const value = e.target.value
    setFields((fields) => {
      return { ...fields, [name]: value }
    })
  }
  const gotoDashboard = () => {}
  //This sends the user email to the api. The api is expected to send the password related to the email
  const handleSignin = async () => {
    if (fields.email && fields.password) {
      try {
        const opts = {
          method: 'POST',
          header: { 'Content-Type': 'application/json' },
          body: { email: fields.email },
        }
        const resp = await fetch('link-to-api/get-user-password', opts)
        const response = await resp.json()
        const password = response.password
        if (password.trim() === fields.password.trim()) {
          gotoDashboard(fields.email)
        } else {
          setErrorMessage('Invalid Email or Password!')
        }
      } catch (TypeError) {}
    } else {
      setValidating(true)
    }
  }
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
            {validating && !fields.email ? (
              <p className='error'>Please Fill in this Field!</p>
            ) : undefined}
          </div>
          <div>
            <input
              className='input'
              name='password'
              type='password'
              placeholder='Enter your password'
              defaultValue={fields.password}
            />
            {validating && !fields.password ? (
              <p className='error'>Please Fill in this Field!</p>
            ) : undefined}
          </div>
          <p className='error'>{errorMessage}</p>
          <div>
            <button className='loginbtn' onClick={handleSignin}>
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
