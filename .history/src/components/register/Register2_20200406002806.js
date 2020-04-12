import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import { Redirect } from 'react-router-dom';


class Register2 extends React.Component {
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
      this.setState({redirect: true})
    }
  
    render(){
      if(this.state.redirect){
        return <Redirect to='/register-2' />
      }
      return(
        <div>
        <h1>Just a bit more info!</h1>
        <form onSubmit={this.handleSubmit}>

          <div>
            <div>
              <label for="name">Name</label>
            </div>
            <div>
              <input className="input-default" type="name" placeholder="First Last" name="name" value={this.state.value} onChange={this.handleChangeName} />
            </div>
          </div>

          <div>
            <div>
              <label for="password">Birthday</label>
            </div>
            <div>
              <input className="input-default" type="password" placeholder="password" name="password" value={this.state.value} onChange={this.handleChangePassword} />
            </div>
          </div>

          <div>
            <div>
              <label for="password">Diagnosis(optional)</label>
            </div>
            <div>
              <input className="input-default" type="password" placeholder="password" name="password" value={this.state.value} onChange={this.handleChangePassword} />
            </div>
          </div>
          <input className="btn-primary-solid" type="submit" value="Submit"/>
        </form>
      </div>
      )
    }
  }
  
export default Register2;