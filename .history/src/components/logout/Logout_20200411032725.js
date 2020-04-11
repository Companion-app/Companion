import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import { Redirect, withRouter } from 'react-router-dom';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../styles/css/main.css';


class Logout extends React.Component {
    constructor() {
      super();
      this.state = {
        userSession: Session.get('user'),
        errorMessage: '',
        redirect: false,
        sessionEmail : ''
      }
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e){
      e.preventDefault();
      axios.post('http://localhost:5000/logout', {
        withCredentials: true
      }).then(res => {
        Session.remove('user');

        this.setState({
          redirect: true
        })
      }).catch(error=>{
        if(error.response){
          this.setState({
            errorMessage: "Sorry, something went wrong. Try again."
          })
        }
      })
    }

    render(){
      if(this.state.redirect){
        console.log(this.state.userSession)
        return <Redirect exact to='/' />
        // history.pushState(null, '/')
      }
      return(
        <div className="hdo-DivBacking">
        <p>Are you sure you would like to Logout?</p>
        <form onSubmit={this.handleSubmit}>
          <input className="btn-secondary-default" type="submit" value="Yes"/>
          <input className="hda-btn-secondary-alert" type="submit" value="No"/>

          {/* padding is off on buttons when they are submit */}
          {/* <Button className="hda-btn-primary-solid" as="submit" value="Submit">Submit</Button> */}

        </form>

        <p>{this.state.errorMessage}</p>
      </div>

      )
    }
  }
export default Logout;