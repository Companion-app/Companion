import React from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className=" ">
                <h1 className=" ">Jane Doe</h1>
                <p className=" ">January 1 2000</p>
                <div className=" ">
                    <h1>Diagnoses</h1>
                    <ul>
                        <li>Depression</li>
                        <li>Bipolar</li>
                    </ul>
                </div>
            </div>
        );

    }
};

export default Profile;