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

        }
    }

    render(){
        return(
            <div>
                {/* Div for graph */}
                {/* <div></div> */}
                <Button className="panel">MOODS</Button>
                <Button className="panel">MEDS</Button>


            </div>
        )
    }


}

export default Home;