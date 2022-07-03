import { React, useState, useEffect } from 'react'
import '../App.css'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Register from './Register/Register'
import Signin from './Signin/Signin'
const App = () => {
  const [navRefList, setNavRefList] = useState([])
  return (
    <>
      <div>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/signin'>
              <Signin />
            </Route>
            <Route path='/:id'>
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  )
}

export default App
