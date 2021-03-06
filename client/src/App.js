import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom'

import LandingPage from './components/views/LandingPage/LandingPage'
import Footer from './components/views/Footer/Footer'
import LoginPage from './components/views/LoginPage/LoginPage'
import NavBar from './components/views/NavBar/NavBar'
import RegisterPage from './components/views/RegisterPage/RegisterPage'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/footer" component={Footer} />
          <Route exact path="/navber" component={NavBar} />

          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
