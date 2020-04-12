import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
} from 'react-router-dom';
import Session from 'react-session-api';
import ReactModal from 'react-modal';
import Profile from '../profile/Profile.js';
import MoodList from '../mood-list/MoodList.js';
import MedList from '../med-list/MedList.js';
import Register from '../register/Register.js';
import LogIn from '../login/LogIn.js';
import Logout from '../logout/Logout.js';
import Navbar from '../navbar/Navbar.js';
import Home from 'Home'

// Styling
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../styles/css/main.css';


ReactModal.setAppElement('#root')

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      sessionId: '',
      sessionEmail: ''
    }
  }

  componentDidMount() {
    const setCallback = (data) => {
      this.setState({
        sessionId: data['id'],
        sessionEmail: data['email']
      })
    }
    Session.onSet(setCallback)
  }

  render(){
    const data = Session.get('user')
    let dataLi;
    if(data) {
      dataLi = <li>{data['email']}</li>
    }
return(
      <Router>
      <div className="page-constraint">

          {/* <Button className="btn-primary-solid" onClick={this.Register}>Register</Button>
          <Button className="btn-primary-solid-alt" onClick={this.Login}>Login</Button> */}

          {/* Replace these buttons with above, paths need to be fixed */}
          
          <button className="btn-primary-solid">
            <Link to="/register">Register</Link>
          </button>
          <button className="btn-primary-solid"> 
            <Link to="/login">Login</Link>
          </button>
          <button className="btn-primary-solid"> 
            <Link to="/logout">Logout</Link>
          </button>



        <Switch>
          <Route path="/mood-list">
            <MoodList />
          </Route>
          <Route path="/med-list">
            <MedList />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>

        <Navbar fixed="bottom"/>
      </div>
      </Router>
    )
  }
}

export default App;
