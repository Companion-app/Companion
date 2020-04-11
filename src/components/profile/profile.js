import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';

// https://react-icons.netlify.com/#/
import { IconContext } from 'react-icons';
import { FaBirthdayCake } from 'react-icons/fa';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userSession: Session.get('user'),
            name: '',
            birthday: '',
            diagnosis: ''
        }
    }

    componentDidMount(){
        if(this.state.userSession) {
            axios.get('http://localhost:5000/get-profile', {
                params: { id: this.state.userSession['id'] },
                withCredentials: true
            }).then(res => {
                console.log(res.data)
                this.setState({
                name: res.data.name,
                birthday: res.data.birthday,
                diagnosis: res.data.diagnosis
            })
        })
        }
    }

    render() {

        return (

            // to consider: edit button
            <div className=" ">
                <h1 className="hda-DivHeading">My Profile</h1>
            <IconContext.Provider value={{size: '.8rem', color: 'black'}}> 
            <div className="hdo-DivBacking">
                <h1>
                    {this.state.name}
                </h1>
                <p>
                    <FaBirthdayCake />  
                    {this.state.birthday}

                </p>
                <div>
                    <h2>Diagnoses</h2>
                    {this.state.diagnosis}
                </div>
            </div>
            </IconContext.Provider>

            {/* LOGOUT BUTTON */}
            </div>

        );

    }
};

export default Profile;