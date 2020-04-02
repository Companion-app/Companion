import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import { Redirect } from 'react-router-dom';


class Register extends React.Component {
    constructor() {
      super();
      this.state = {
        userSession: Session.get('user'),
        email: '',
        password: ''
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
      axios.post('http://localhost:5000/register', {
        email: this.state.email,
        password: this.state.password
      }, { withCredentials: true }).then(res => console.log(res.data))
      // this.setState({redirect: true})
    }
  
    render(){
      return(
        <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <p>Email</p>
          <input type="email" placeholder="email@email.com" name="email" value={this.state.value} onChange={this.handleChangeEmail} />
  
          <p>Password</p>
          <input type="password" placeholder="password" name="password" value={this.state.value} onChange={this.handleChangePassword} />
  
          <input class="btn-primary-solid" type="submit" value="Submit"/>
        </form>
      </div>
  
      )
    }
  }
  
  
    class LogIn extends React.Component {
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
        axios.post('http://localhost:5000/login', {
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
            <input type="email" placeholder="email@email.com" name="email" value={this.state.value} onChange={this.handleChangeEmail} />
  
            <p>Password</p>
            <input type="password" placeholder="password" name="password" value={this.state.value} onChange={this.handleChangePassword} />
  
            <input type="submit" value="Submit"/>
          </form>
  
          <p>{this.state.errorMessage}</p>
        </div>
  
        )
      }
    }

export default Register;