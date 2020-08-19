import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './Components/Header'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import Tickets from './Components/Tickets'
import Admin from './Components/Admin'

import PrivateRoute from './hocs/PrivateRoute'
import UnPrivateRoute from './hocs/UnPrivateRoute'

function App() {
  return (
    <Router>
      <Header/>
      <div className="container-fluid">
        <Route exact path='/' component={Home}/>
        <UnPrivateRoute path="/login" component={Login}/>
        <PrivateRoute path="/register" roles={["Admin"]} component={Register}/>
        <PrivateRoute path="/admin" roles={["Admin"]} component={Admin}/>
        <PrivateRoute path="/tickets" roles={["User","Admin"]} component={Tickets}/>
      </div>
    </Router>
  );
}

export default App;
