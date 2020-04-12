import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import { Redirect } from 'react-router-dom';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import '../../styles/css/main.css';


class Logout extends React.Component {
    constructor() {
      super();
      this.state = {
        userSession: Session.get('user'),
        errorMessage: '',
        redirect: false,
        redirectHome: false,
        sessionEmail : ''
      }
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e){
      e.preventDefault();
      console.log(e.taget.value)
      if(e.target.value === "Yes"){
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
      }else{
        this.setState({
          redirectHome: true
        })
      }
    }

    render(){
      if(this.state.redirect){
        return <Redirect to='/' />
      }
      if(this.state.redirectHome){
        return <Redirect to='/home'/>
      }
      return(
      <div className="hdo-DivBacking">
        <p>Are you sure you would like to Logout?</p>
        <Form onSubmit={this.handleSubmit}>
          
          <Button className="hda-btn-primary-solid" type="submit" value="Yes">Yes</Button>
          <Button className="hda-btn-secondary-alert" type="submit" value="No">No</Button>
        </Form>

        <p>{this.state.errorMessage}</p>
      </div>

      )
    }
  }
export default Logout;