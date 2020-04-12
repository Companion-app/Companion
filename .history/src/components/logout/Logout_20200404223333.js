import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import { Redirect } from 'react-router-dom';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../styles/css/main.css';


class Logout extends React.Component {
    constructor() {
      super();
      this.state = {
        userSession: Session.get('user'),
        email: '',
        password: '',
        errorMessage: '',
        redirect: false,
        sessionEmail : ''
      }

      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChangeEmail(event) {
      this.setState({email: event.target.value});
    }

    handleChangePassword(event) {
      this.setState({password: event.target.value});
    }

    handleSubmit(e){
      e.preventDefault();
      axios.post('http://localhost:5000/logout', {
        email: this.state.email,
        password: this.state.password
      }, {
        withCredentials: true
      }).then(res => {
        Session.set('user', res.data)

        this.setState({
          redirect: true
        })
      }).catch(error=>{
        if(error.response){
          this.setState({
            errorMessage: "The user does not exist, or the password is incorrect. Try again."
          })
        }
      })
    }

    render(){
      if(this.state.redirect){
        return <Redirect to='/' />
      }
      return(
        <div>
        <h1>Welcome Back!</h1>
        <form onSubmit={this.handleSubmit}>
          <p>Email</p>
          <input className="input-default" type="email" placeholder="email@email.com" name="email" value={this.state.value} onChange={this.handleChangeEmail} />

          <p>Password</p>
          <input className="input-default" type="password" placeholder="password" name="password" value={this.state.value} onChange={this.handleChangePassword} />

          <input className="btn-primary-solid" type="submit" value="Submit"/>

          {/* padding is off on buttons when they are submit */}
          {/* <Button className="btn-primary-solid" as="submit" value="Submit">Submit</Button> */}

        </form>

        <p>{this.state.errorMessage}</p>
      </div>

      )
    }
  }
export default Logout;