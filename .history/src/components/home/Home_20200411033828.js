import React from 'react';
// import "../node_modules/react-vis/dist/style.css";
import { XAxis, YAxis, XYPlot, VerticalBarSeries } from "react-vis";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
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
            moodSelectedByUser: [],
                anger: [
                    { x: "Sunday", y: 5 },
                    { x: "Monday", y: 2 },
                    { x: "Tuesday", y: 3 },
                    { x: "Wednesday", y: 4 },
                    { x: "Thursday", y: 2 },
                    { x: "Friday", y: 5 },
                    { x: "Saturday", y: 1 }
                ],
                irritability: [
                    { x: "Sunday", y: 5 },
                    { x: "Monday", y: 1 },
                    { x: "Tuesday", y: 2 },
                    { x: "Wednesday", y: 3 },
                    { x: "Thursday", y: 5 },
                    { x: "Friday", y: 2 },
                    { x: "Saturday", y: 3 }
                ],
                anxiousness: [
                    { x: "Sunday", y: 2 },
                    { x: "Monday", y: 2 },
                    { x: "Tuesday", y: 4 },
                    { x: "Wednesday", y: 5 },
                    { x: "Thursday", y: 2 },
                    { x: "Friday", y: 2 },
                    { x: "Saturday", y: 1 }
                ]
        };
    this.onChange = this.onChange.bind(this);
}

onChange = e => {
    const moodSelectedByUser = e.target.value;
    if(moodSelectedByUser === "0"){
            this.setState({ moodSelectedByUser: this.state.anger })
        }else if(moodSelectedByUser === "1"){
            this.setState({ moodSelectedByUser: this.state.irritability })
        }else if(moodSelectedByUser === "2"){
            this.setState({ moodSelectedByUser: this.state.anxiousness })
        };
        console.log(this.state.moodSelectedByUser)
};

    render(){
        // if(!this.state.userSession ){
        //     return <Redirect to="/" />
        // }
        
        // if(data && 'id' in data){
        //     display = <Home />
        //     showNav = <Navbar/>
        // }else{
        //     display = <Splash />
        // }

        return(
            <div>
                <h1 className="hda-DivHeading">Home</h1>
                <div>
                    <h2>Weekly Mood Summary</h2>
                    <p>Select your mood:</p>
                    <select defaultValue={this.state.selectValue} onChange={this.onChange} >
                        <option value="0">Anger</option>
                        <option value="1">Irritability</option>
                        <option value="2">Anxiousness</option>
                    </select>
                    </div>
                    <XYPlot height={350} width={580} xType="ordinal" color="orange">
                    <VerticalBarSeries data={this.state.moodSelectedByUser} />
                    {console.log(this.state.moodSelectedByUser)}

                    <XAxis title="Mood" />
                    <YAxis title="Intensity" />
                    <p>Mood by Intensity</p>
                    </XYPlot>
                <div>
                </div>
                <div>
                    {/* Div for graph */}
                    {/* <div></div> */}
                    <Button className="hda-panel">
                        <Link to="/mood-list">MOODS</Link>
                    </Button>
                    <Button className="hda-panel">
                        <Link to="/med-list">MEDS</Link>
                    </Button>
                    <Button className="hda-panel">
                        <Link to="/profile">PROFILE</Link>
                    </Button>
                </div>
            </div>
        )
    }


}

export default withRouter(Home);