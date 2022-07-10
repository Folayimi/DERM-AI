import { React, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Signin.css'
const Signin = ({ sendId }) => {
  const [fields, setFields] = useState({
    email: '',
    password: '',
  })
  const history = useHistory()
  const [loginStatus, setLoginStatus] = useState('Sign in')
  const [errorMessage, setErrorMessage] = useState('')
  const [validating, setValidating] = useState(false)
  const [passValidated, setPassValidated] = useState(false)
  const handleInputChange = (e) => {
    const name = e.target.getAttribute('name')
    const value = e.target.value
    setFields((fields) => {
      return { ...fields, [name]: value }
    })
  }

  useEffect(() => {
    if (passValidated) {
      var idVal = fields.id
      var email = fields.email
      sendId(idVal)
      var now = Date.now()

      var sess = 0
      idVal.split('').forEach((elem) => {
        sess += elem.codePointAt(0)
      })
      window.sessionStorage.setItem('sess-recg-id', now * sess)
      window.sessionStorage.setItem('idt-curr-usr', now)
      window.sessionStorage.setItem('user-id', email)
      history.push('./dashboard')
      setPassValidated(false)
    }
  }, [passValidated])

  //This sends the user email to the api. The api is expected to send the password related to the email
  const handleSignin = async () => {
    setLoginStatus('Hold on...')    
    if (fields.email && fields.password) {
      try {
        const opts = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: fields.email }),
        }
        const resp = await fetch('/getpassList', opts)
        const response = await resp.json()
        console.log(response)
        const idVal = await response.id
        fields.id = idVal
        const password = await response.password
        if (password.trim() === fields.password.trim()) {
          setLoginStatus('Signing in...')
          setPassValidated(true)
        } else {
          setLoginStatus('Sign in')
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSignin()
                }
              }}
            />
            {validating && !fields.password ? (
              <p className='error'>Please Fill in this Field!</p>
            ) : undefined}
          </div>
          <p className='error'>{errorMessage}</p>
          <div>
            <button className='loginbtn' onClick={handleSignin}>
              {loginStatus}
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
