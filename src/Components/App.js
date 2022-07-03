import { React, useState, useEffect } from 'react'
import '../App.css'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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
