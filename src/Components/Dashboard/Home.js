import { React, useState, useEffect, useRef } from 'react'
import './Dashboard.css'
import logo from './Images/logo.png'
const Home = ({ user, analyzeImage }) => {
  const imgRef = useRef(null)
  const [file, setFile] = useState(null)
  const [userImg, setUserImg] = useState('')
  const [imgUrl, setImgUrl] = useState(logo)
  const fileHandler = (e) => {
    var file = e.target.files[0]
    setFile(file)
    const url = URL.createObjectURL(file)
    setImgUrl(url)
    analyzeImage(url)
    const imgSrc = Date.now() + file.name
    setUserImg(imgSrc)
    // studentInfo.img=imgSrc;
  }
  const uploadImg = () => {
    imgRef.current.click()
  }
  return (
    <>
      <div>
        <div style={{textAlign:'left', fontFamily:'monospace', fontSize:'1.2rem', justifyContent:'center',margin:'20px'}}>
          <label>{'Hi, ' + user.fullName + '.'}</label>
        </div>
        <div
          style={{
            fontFamily: 'Courier New',
            fontSize: '1.2rem',
            margin: '20px',
            padding: '.5rem',
            fontWeight: 'bold',
	    color:'white',
	    backgroundColor:'rgba(250,90,81,1)',
	    justifyContent: 'center',
	    alignItem: 'center',
	    border:'solid pink 2px', 
            borderRadius:'10px',
	    
          }}
        >
          <label style={{
	    
	  }}>
	    WELCOME. TRUST US AND LET US HELP YOU STAY HEALTHY. </label>
        </div>
        <div
          style={{
            fontFamily: 'Courier New',
            fontSize: '1.2rem',
            padding: '.5rem',
            fontWeight: 'bold',
	    justifyContent: 'center',
	    alignItem: 'center',
	    border:'solid pink 2px', 
            borderRadius:'10px',
	    margin:'20px',
          }}
        >
          <label style={{
	    
	  }}>
            DERMERTOLOGIST ARTIFICIAL INTELIGENCE IS ONE OF OUR TOOLS THAT HELPS
            IN DETECTING EARLY STAGES OF CANCER AND PROVIDE LATEST TECHNOLOGICAL
            REMEDIES
          </label>
        </div>
        <div style={{textAlign:'center'}}>
          <img style={{borderRadius:'50%'}} src={imgUrl} alt='user' height='120rem' />
          <input
            ref={imgRef}
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={fileHandler}
          />

          <p>
            <button

              style={{ 
		backgroundColor: 'blue', 
		color: 'white', 
		padding:'1rem', 
		paddingLeft:'1.5rem', 
		paddingRight:'1.5rem',
		margin:'.5rem',
		fontSize:'1.2rem',
		border:'solid blue 2px',
		borderRadius:'2rem' }}
              title='Upload Image'
              type='submit'
              name='button'
              value='Upload'
              onClick={uploadImg}
            >
              Upload Test Image
            </button>
          </p>
        </div>
      </div>
    </>
  )
}

export default Home
