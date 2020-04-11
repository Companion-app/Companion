import React from 'react';
// import "../node_modules/react-vis/dist/style.css";
import { XAxis, YAxis, makeWidthFlexible, XYPlot, FlexibleXYPlot, VerticalBarSeries } from "react-vis";
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
            moodSelectedByUser: [],
                anger: [
                    { x: "S", y: 5 },
                    { x: "M", y: 2 },
                    { x: "T", y: 3 },
                    { x: "W", y: 4 },
                    { x: "T", y: 2 },
                    { x: "F", y: 5 },
                    { x: "SA", y: 1 }
                ],
                irritability: [
                    { x: "S", y: 5 },
                    { x: "M", y: 1 },
                    { x: "T", y: 2 },
                    { x: "W", y: 3 },
                    { x: "T", y: 5 },
                    { x: "F", y: 2 },
                    { x: "SA", y: 3 }
                ],
                anxiousness: [
                    { x: "S", y: 2 },
                    { x: "M", y: 2 },
                    { x: "T", y: 4 },
                    { x: "W", y: 5 },
                    { x: "T", y: 2 },
                    { x: "F", y: 2 },
                    { x: "SA", y: 1 }
                ]
        };
    this.onChange = this.onChange.bind(this);
}

onChange = e => {
    const FlexibleXYPlot = makeWidthFlexible(XYPlot); 
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
        // if(sessionId){

        // }

        return(
            <div className="hdp-bottom-padding">
                    <h1 className="hda-DivHeading">Home</h1>

                <div className="hdo-DivBacking">
                    <div>
                        <h3 className="hda-CenterText">Weekly Mood Summary</h3>
                        <p className="hdo-padding" >Select your mood:</p>
                        <select className="hdo-padding" defaultValue={this.state.selectValue} onChange={this.onChange} >
                            <option value="0">Anger</option>
                            <option value="1">Irritability</option>
                            <option value="2">Anxiousness</option>
                        </select>
                    </div>

                    <FlexibleXYPlot height={200} xType="ordinal" color="orange">
                        <VerticalBarSeries data={this.state.moodSelectedByUser} />
                        {console.log(this.state.moodSelectedByUser)}
                        <XAxis title="Mood" />
                        <YAxis title="Intensity" />
                        {/* <p>Mood by Intensity</p> */}
                    </FlexibleXYPlot>

                </div>
                <div className="hdo-padding">
                    <Button className="hda-panel">MOODS</Button>
                    <Button className="hda-panel">MEDS</Button>
                    <Button className="hda-panel">PROFILE</Button>
                </div>
            </div>
        )
    }


}

export default Home;