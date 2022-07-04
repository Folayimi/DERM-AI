import { React } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
const Success = ({ fields }) => {
  return (
    <>
      <div className='successpage'>
        <div>
          <label style={{ fontFamily: 'Courier New', fontSize: '1.2rem' }}>
            {'Hi ,' + fields.fullName + '. Your Registration was Successfull!'}
          </label>
        </div>
        <div>
          <Link to='/signin'>
            <button className='pdtosignin'>Proceed to Sign in</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Success
