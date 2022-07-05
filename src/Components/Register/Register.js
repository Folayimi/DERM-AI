import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import Success from './Success'

const Register = () => {
  const [fields, setFields] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [registrationStatus, setRegistrationStatus] = useState('Sign up')
  const [showSuccessPage, setShowSuccessPage] = useState(false)
  const [validating, setValidating] = useState(false)
  const handleInputChange = (e) => {
    const name = e.target.getAttribute('name')
    const value = e.target.value
    setFields((fields) => {
      return { ...fields, [name]: value }
    })
  }
  useEffect(() => {
    if (fields.confirmPassword) {
      setValidating(true)
    }
  }, [fields.confirmPassword])
  const handleRegister = async () => {
    setRegistrationStatus('Hold on...')
    if (
      fields.fullName &&
      fields.email &&
      fields.password &&
      fields.confirmPassword
    ) {
      const user = {
        fullName: fields.fullName,
        email: fields.email,
        password: fields.password,
        created: Date.now(),
      }

      console.log(user)
      setValidating(false)
      setRegistrationStatus('Finishing up...')
      try {
        const opts = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        }

        const resp = await fetch('http://localhost:3001/postUserDetails', opts)
        const response = await resp.json()
        const delivered = response.delivered
        if (delivered) {
          setShowSuccessPage(true)
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
        {showSuccessPage ? <Success fields={fields} /> : undefined}
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
                Welcome onboard!
              </label>
            </p>
            <p style={{ marginTop: '10px' }}>
              <label>Let's Help You Setup Your Account</label>
            </p>
          </div>
          <div>
            <input
              className='input'
              name='fullName'
              defaultValue={fields.fullName}
              placeholder='Enter your full name'
            />
            {validating && !fields.fullName ? (
              <p className='error'>Please Fill in this Field!</p>
            ) : undefined}
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
          <div>
            <input
              className='input'
              name='confirmPassword'
              type='password'
              placeholder='Confirm Password'
              defaultValue={fields.confirmPassword}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleRegister()
                }
              }}
            />
            {validating ? (
              !fields.confirmPassword ? (
                <p className='error'>{'Please Fill in this Field!'}</p>
              ) : fields.password === fields.confirmPassword &&
                fields.confirmPassword ? (
                <p
                  className='error'
                  style={{
                    color: 'lightgreen',
                  }}
                >
                  {'Password Confirmed!'}
                </p>
              ) : (
                <p className='error'>{'Passwords Do Not Match!'}</p>
              )
            ) : undefined}
          </div>
          <div>
            <button className='registerbtn' onClick={handleRegister}>
              {registrationStatus}
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
