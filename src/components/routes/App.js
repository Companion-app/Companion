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
// import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from '../profile/profile.js';
import MoodList from '../mood-list/MoodList.js';
import Register from '../register/Register.js';
import LogIn from '../login/LogIn.js';
import Navbar from '../navbar/navbar.js';


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
      <div>

        <div>
          <ul>
        <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            </ul>
        </div>

        <Switch>
          <Route path="/mood-list">
            <MoodList />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <LogIn />
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
