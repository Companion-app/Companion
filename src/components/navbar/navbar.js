import React from 'react';
import { Link } from 'react-router-dom';

// https://react-icons.netlify.com/#/
import { IconContext } from 'react-icons';
import { AiTwotoneHome } from 'react-icons/ai';
import { FaSmile } from 'react-icons/fa';
import { FaPills } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/css/layout/navigation.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (

            <Container className="Navbar">
                {/* Use of IconContext to style all at once, instead of each icon individually. 
                If we want to override one icon, simlply change it in the icon element 
                https://www.youtube.com/watch?v=4l0nsK4ezNc*/}
                <IconContext.Provider value={{size: '2rem', color: 'black'}}> 
                    <Row>
                        <Col className="Icon" xs={3}><Link to="/home"><AiTwotoneHome /></Link></Col>
                        <Col className="Icon" xs={3}><Link to="/mood-list"><FaSmile /></Link></Col>
                        <Col className="Icon" xs={3}><Link to="/med-list"><FaPills /></Link></Col>
                        <Col className="Icon" xs={3}><Link to="/profile"><FaUserAlt /></Link></Col>
                    </Row>
                </IconContext.Provider>
            </Container>
        );

    }
};

export default Navbar;