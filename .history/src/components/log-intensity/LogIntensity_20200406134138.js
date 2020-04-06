import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../styles/css/main.css';


class LogIntensity extends React.Component{
    constructor(){
        super()
        this.state = {
        userSession: Session.get('user'),
        }
    }

    render(){

        return(
            
        )
    }

}

export default LogIntensity;

