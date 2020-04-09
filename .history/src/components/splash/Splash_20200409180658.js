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
                <img src="../../assets/companion-logo.png" />
                {/* Div for graph */}
                {/* <div></div> */}
            </div>
        )
    }


}

export default Splash;