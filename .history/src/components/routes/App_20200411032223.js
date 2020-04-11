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
      sessionId: ''
      // sessionEmail: ''
      // showSplash: true
    }
  }

  componentDidMount() {
    const setCallback = (data) => {
      this.setState({
        sessionId: data
        // sessionEmail: data['email']
      })
    }
    Session.onSet(setCallback)
  }

  // shouldComponentUpdate(){
  //   const data = Session.get('user')
  //   console.log(data)
  //   return false;
  // }

  render(){
    const data = Session.get('user')
    // let dataLi;
    // if(data) {
    //   dataLi = <li>{data['email']}</li>
    // }
    // if(this.state.userSession['id']){
    //   this.setState({
    //     showSplash : false
    //   })
    // }

    let display;
    let showNav;
    // console.log(this.state.sessionId['user']['id'])
    // for(var d in data){
    //   console.log(d)
    // }
    console.log(data)
    if(data && 'id' in data){
      display = <Home />
      showNav = <Navbar/>
    }else{
      display = <Splash />
    }

    return(
      <Router>
      <div>

        <Switch>
          <Route 
            exact
            path="/">
            <Splash />
          </Route>
          <Route
            exact
            path="/home">
            <Home />
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
        
        {showNav}
      </div>
      </Router>
    )
  }
}

export default App;
