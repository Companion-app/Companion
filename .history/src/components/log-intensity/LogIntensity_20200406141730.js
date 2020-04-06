import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Form, FormControl, FormGroup} from 'react-bootstrap';
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
         <div>
            <Form>
            <Form.Group controlId="formBasicRange">
                <Form.Label>Range</Form.Label>
                <Form.Control type="range" />
            </Form.Group>
            </Form>
         </div>
        )
    }

}

export default LogIntensity;

