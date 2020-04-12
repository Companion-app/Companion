import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams,
    withRouter
} from 'react-router-dom';
import Session from 'react-session-api';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button} from 'react-bootstrap';
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
            <div className="hdt-SplashBacking hda-CenterText">
                <div className="hdo-SplashBacking hda-CenterText">
                    <img className="hda-Logo" width="50%" src="/assets/companion-logo.png" />
                    <h1 className="hda-SplashWelcome">WELCOME</h1>
                    <p className="hda-SplashCTA">Login to continue</p>
                    
                    <Button className="hda-btn-primary-solid-alt" href="/login">LOGIN 
                        {/* <Link className=" " to="/login">LOGIN</Link> */}
                    </Button>
                    <Button className="hda-btn-primary-solid" href="/register">REGISTER
                        {/* <Link className=" " to="/register">REGISTER</Link> */}
                    </Button>

                    {/* Div for graph */}
                    {/* <div></div> */}
                </div>
                <div className="hda-SplastText">
                    <p>COMPANION</p>
                </div>
            </div>
        )
    }


}

export default Splash;