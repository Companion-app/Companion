import React from 'react';
import {
    Link
} from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div>
                <nav>
                <ul>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <Link to="/mood-list">Mood</Link>
                    </li>
                    <li>
                    <Link to="/users">Users</Link>
                    </li>
                    <li>
                    <Link to="/profile">Profile</Link>
                    </li>
                </ul>
                </nav>
            </div>
        );

    }
};

export default Navbar;