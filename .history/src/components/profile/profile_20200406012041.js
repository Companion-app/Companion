import React from 'react';

// https://react-icons.netlify.com/#/
import { IconContext } from 'react-icons';
import { FaBirthdayCake } from 'react-icons/fa';


class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        if(this.state.userSession) {
          axios.get('http://localhost:5000/get-profile', {
            params: { id: this.state.userSession['id'] },
            withCredentials: true
          }).then(res => this.setState({ moods: res.data.moods }))
        }
      }
  
    render() {

        return (

            // to consider: edit button
            <IconContext.Provider value={{size: '.8rem', color: 'black'}}> 
            <div className="box-info">
                <h1 className=" ">Jane Doe</h1>
                <p className=" "><FaBirthdayCake />  Birthday: January 1 2000</p>
                <div className=" ">
                    <h2>Diagnoses</h2>
                    <ul>
                        <li>Depression</li>
                        <li>Bipolar</li>
                    </ul>
                </div>
            </div>
            </IconContext.Provider>

        );

    }
};

export default Profile;