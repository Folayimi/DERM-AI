import { React, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

import close from './Image/close.jpg'
import opts from './Image/opts.png'

const Navbar = ({ getNavRefList }) => {
  const categoriesRef = useRef(null)
  const servicesRef = useRef(null)
  const featuresRef = useRef(null)
  const teamRef = useRef(null)
  const [size, setSize] = useState(window.innerWidth)
  const [showNavBar, setShowNavBar] = useState(true)
  const [isClicked, setIsClicked] = useState(false)
  const navRefList = [
    { name: 'categories', ref: categoriesRef },
    { name: 'services', ref: servicesRef },
    { name: 'features', ref: featuresRef },
    { name: 'team', ref: teamRef },
  ]
  const checkSize = () => {
    setSize(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', checkSize)

    return () => {
      window.removeEventListener('resize', checkSize)
    }
  }, [])
  useEffect(() => {
    getNavRefList()
  }, [navRefList])
  useState(() => {
    if (size <= 800) {
      setShowNavBar(false)
    }
  }, [])
  const activateRef = (ref) => {
    navRefList.forEach((rf) => {
      if (rf.ref.current !== undefined) {
        rf.ref.current.style.color = 'rgba(255,255,255,0.7)'
      }
      ref.current.style.color = 'white'
    })
  }

  const handlePageNav = (e) => {
    const name = e.target.getAttribute('name')
    navRefList.forEach((rf) => {
      if (rf.name === name) {
        activateRef(rf.ref)
      }
    })
  }

  return (
    <>
      <div
        onClick={handlePageNav}
        className={size > 800 || showNavBar ? 'navbar' : ''}
      >
        {size <= 800 ? (
          <img
            onClick={() => {
              if (isClicked) {
                setIsClicked(false)
                setShowNavBar(false)
              } else {
                setIsClicked(true)
                setShowNavBar(true)
              }
              console.log(isClicked)
            }}
            style={{ position: 'fixed', top: '5px', right: '5px', zIndex: '1' }}
            src={isClicked ? close : opts}
            height='25px'
          />
        ) : undefined}
        {showNavBar || size > 800 ? (
          <div>
            <div name='home' className='logo'></div>
            <div className='navcover'>
              <Link to='/categories'>
                <div name='categories' className='navitem'>
                  <label
                    ref={categoriesRef}
                    name='categories'
                    style={{ cursor: 'pointer' }}
                  >
                    Categories
                  </label>
                </div>
              </Link>
              <Link to='/services'>
                <div name='services' className='navitem'>
                  <label
                    ref={servicesRef}
                    name='services'
                    style={{ cursor: 'pointer' }}
                  >
                    Services
                  </label>
                </div>
              </Link>
              <Link to='/features'>
                <div name='features' className='navitem'>
                  <label
                    ref={featuresRef}
                    name='features'
                    style={{ cursor: 'pointer' }}
                  >
                    Features
                  </label>
                </div>
              </Link>
              <Link to='/team'>
                <div name='team' className='navitem'>
                  <label
                    ref={teamRef}
                    name='team'
                    style={{ cursor: 'pointer' }}
                  >
                    {' '}
                    Our Team
                  </label>
                </div>
              </Link>
            </div>
            <Link to='/signin' style={{ textDecoration: 'none' }}>
              <div className='signin'>
                <label style={{ cursor: 'pointer' }}>Sign in</label>
              </div>
            </Link>
          </div>
        ) : undefined}
      </div>
    </>
  )
}

export default Navbar
