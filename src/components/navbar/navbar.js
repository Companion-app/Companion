import React from 'react';
import { Link } from 'react-router-dom';

// https://react-icons.netlify.com/#/
import { AiTwotoneHome } from 'react-icons/ai';
import { FaSmile } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';

import '../../styles/navbar.css';
import { Container, Row, Col } from 'react-bootstrap';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <Container>
                <Row>
                    <Col ><Link to="/home"><AiTwotoneHome className="NavIcon" /></Link></Col>
                    <Col ><Link to="/mood-list"><FaSmile className="NavIcon" /></Link></Col>
                    <Col ><Link to="/calendar"><FaCalendarAlt className="NavIcon" /></Link></Col>
                    <Col ><Link to="/profile"><FaUserAlt className="NavIcon" /></Link></Col>
                </Row>
            </Container>
            // <div>
            //     <nav>
            //     <ul>
            //         <li>
            //         <Link to="/home"><AiTwotoneHome className="NavIcon" /></Link>
            //         </li>
            //         <li>
            //         <Link to="/mood-list"><FaSmile className="NavIcon" /></Link>
            //         </li>
            //         <li>
            //         <Link to="/calendar"><FaCalendarAlt className="NavIcon" /></Link>
            //         </li>
            //         <li>
            //         <Link to="/profile"><FaUserAlt className="NavIcon" /></Link>
            //         </li>
            //     </ul>
            //     </nav>
            // </div>
        );

    }
};

export default Navbar;