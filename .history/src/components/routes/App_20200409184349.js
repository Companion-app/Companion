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
import Home from '../home/Home.js';
import Splash from '../splash/Splash.js';


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
      // sessionEmail: ''
      showSplash: true
    }
  }

  componentDidMount() {
    const setCallback = (data) => {
      this.setState({
        sessionId: data['id']
        // sessionEmail: data['email']
      })
    }
    Session.onSet(setCallback)
  }

  render(){
    const data = Session.get('user')
    // let dataLi;
    // if(data) {
    //   dataLi = <li>{data['email']}</li>
    // }
    if(this.state.sessionId){
      this.setState({
        showSplash : false
      })
    }

    let display;
    let showNav;
    if(this.state.showSplash){
      display = <Splash />
    }else{
      display = <Home />
      showNav = <Navbar fixed="bottom"/>
    }

    return(
      <Router>
      <div className="page-constraint">

          {/* <Button className="btn-primary-solid" onClick={this.Register}>Register</Button>
          <Button className="btn-primary-solid-alt" onClick={this.Login}>Login</Button> */}

          {/* Replace these buttons with above, paths need to be fixed */}
          
          {/* <Button className="btn-primary-solid"> 
            <Link to="/logout">Logout</Link>
          </Button> */}
         

        <Switch>
          <Route 
            exact
            path="/">
            {display}
          </Route>
          <Route 
            exact
            path="/mood-list">
            <MoodList />
          </Route>
          <Route path="/med-list">
            <MedList />
          </Route>
          <Route 
            exact
            path="/register">
            <Register />
          </Route>
          <Route 
            exact
            path="/login">
            <LogIn />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>

      </div>
      </Router>
    )
  }
}

export default App;
