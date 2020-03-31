import React from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className="UserInfo">
                <h1 className="FullName">Jane Doe</h1>
                <p className="Dob">January 1 2000</p>
                <div className="Diagnoses">
                    <h1>Diagnoses</h1>
                    <ul>
                        <li>Despression</li>
                        <li>Bipolar</li>
                    </ul>
                </div>
            </div>
        );

    }
};

ReactDOM.render(<Profile />, document.getElementById('root'));