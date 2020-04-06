import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import { 
  Redirect, 
  Link
} from 'react-router-dom';


class Register extends React.Component {
    constructor() {
      super();
      this.state = {
        userSession: Session.get('user'),
        email: '',
        password: '',
        showSecondForm: false 
      }
  
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleFirstSubmit = this.handleFirstSubmit.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  
    }
  
    handleChangeEmail(event) {
      this.setState({email: event.target.value});
    }
  
    handleChangePassword(event) {
      this.setState({password: event.target.value});
    }

    handleFirstSubmit(event){
      this.setState({
        showSecondForm: true
      })
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
      if(this.state.showSecondForm){
        var form = (
          <div>
          <h1>Just a bit more info!</h1>
          <div>
            <label for="name">Name</label>
          </div>
          <div>
            <input className="input-default" type="name" placeholder="First Last" name="name" value={this.state.value} onChange={this.handleChangeName} />
          </div>
        </div>

        <div>
          <div>
            <label for="birthday">Birthday</label>
          </div>
          <div>
            <input className="input-default" type="birthday" placeholder="MM/DD/YYYY" name="birthday" value={this.state.value} onChange={this.handleChangeBirthday} />
          </div>
        </div>

        <div>
          <div>
            <label for="diagnosis">Diagnosis(optional)</label>
          </div>
          <div>
            <input className="input-default" type="diagnosis" placeholder="Diagnosis" name="diagnosis" value={this.state.value} onChange={this.handleChangeDiagnosis} />
          </div>
        </div>
        <input className="btn-primary-solid" type="submit" value="Submit"/>

        )

      }else{
        var form = (
        <div>
        <div>
          <div>
            <label for="email">Email</label>
          </div>
          <div>
            <input className="input-default" type="email" placeholder="email@email.com" name="email" value={this.state.value} onChange={this.handleChangeEmail} />
          </div>
        </div>

        <div>
          <div>
            <label for="password">Password</label>
          </div>
          <div>
            <input className="input-default" type="password" placeholder="password" name="password" value={this.state.value} onChange={this.handleChangePassword} />
          </div>
        </div>

        <button className="btn-primary-solid" onClick={this.handleFirstSubmit}>Continue</button>
      </div>
      )}
      return(
        <div>
        <form onSubmit={this.handleSubmit}>
          <h1>I'm ready to help!</h1>
          {form}
          {/* <input className="btn-primary-solid" type="submit" value="Continue"/> */}
        </form>
      </div>
      )
    }
  }
  
export default Register;