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
        redirectProfile: false,
        sessionEmail : ''
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);

    }

    handleInput(e){
      e.preventDefault();
      console.log(e.target.value)

      if(e.target.value === "yes"){
        this.handleSubmit(e)
      }else{
        this.setState({
          redirectProfile:true
        })
      }
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
        return <Redirect to='/' />
      }
      if(this.state.redirectProfile){
        return <Redirect to='/profile'/>
      }
      return(
      <div className="hdo-DivBacking">
        <p>Are you sure you would like to Logout?</p>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Button className="hda-btn-secondary-default" value={"yes"} onClick={this.handleInput}>
              Yes
            </Button>
            <Button className="hda-btn-secondary-alert" value={"no"} onClick={this.handleInput}>
              No
            </Button>
          </FormGroup>
        </Form>

        <p>{this.state.errorMessage}</p>
      </div>

      )
    }
  }
export default Logout;