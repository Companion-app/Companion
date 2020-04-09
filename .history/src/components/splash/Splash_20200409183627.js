import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams,
  } from 'react-router-dom';
  import Session from 'react-session-api';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../styles/css/main.css';
import Register from '../register/Register.js';
import LogIn from '../login/LogIn.js';


class Splash extends React.Component{
    constructor(){
        super()
        this.state = {
            sessionId: ''
        }
    }

    render(){
        // if(sessionId){

        // }

        return(
            <div>
                <img src="/assets/companion-logo.png" />
                <Button className="btn-primary-solid">
                    <Link to="/register">Register</Link>
                </Button>
                <Button className="btn-primary-solid"> 
                    <Link to="/login">Login</Link>
                </Button>

                {/* Div for graph */}
                {/* <div></div> */}
            </div>
        )
    }


}

export default Splash;