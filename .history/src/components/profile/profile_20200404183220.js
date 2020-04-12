import React from 'react';

// https://react-icons.netlify.com/#/
import { IconContext } from 'react-icons';
import { FaBirthdayCake } from 'react-icons/fa';


class Profile extends React.Component {
    constructor(props) {
        super(props);
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