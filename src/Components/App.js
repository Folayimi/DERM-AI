import React, {useState, useEffect } from 'react'
import '../App.css'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Register/Register'
import Signin from './Signin/Signin'
const App = () => {
  const [navRefList, setNavRefList] = useState([])
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home/>}/>             
            <Route path='/register' element = {<Register/>}/>              
            <Route path='/signin' element = {<Signin/>}/>              
            <Route path='/:id' element = {<Home/>}/>              
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
