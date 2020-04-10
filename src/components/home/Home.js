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


class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            userSession: Session.get('user'),
        }
    }

    render(){
        // if(sessionId){

        // }

        return(
            <div>
                <div>
                <h1 className="hda-DivHeading">Home</h1>
                </div>
                <div>
                    {/* Div for graph */}
                    {/* <div></div> */}
                    <Button className="hda-panel">MOODS</Button>
                    <Button className="hda-panel">MEDS</Button>
                    <Button className="hda-panel">PROFILE</Button>
                </div>
            </div>
        )
    }


}

export default Home;