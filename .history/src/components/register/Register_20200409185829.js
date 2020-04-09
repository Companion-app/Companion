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
        showSecondForm: false,
        name: '',
        birthday: '',
        diagnosis: '' 
      }
  
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleFirstSubmit = this.handleFirstSubmit.bind(this);

      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeBirthday = this.handleChangeBirthday.bind(this);
      this.handleChangeDiagnosis = this.handleChangeDiagnosis.bind(this);

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

    handleChangeName(event) {
      this.setState({name: event.target.value});
    }
  
    handleChangeBirthday(event) {
      this.setState({birthday: event.target.value});
    }

    handleChangeDiagnosis(event) {
        this.setState({diagnosis: event.target.value});
      }

  
    handleSubmit(e){
      e.preventDefault();
      axios.post('http://localhost:5000/register', {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        birthday: this.state.birthday,
        diagnosis: this.state.diagnosis
      }, { withCredentials: true }).then(res => console.log(res.data))
      this.setState({redirect: true})
    }
  
    render(){
      if(this.state.redirect){
        return <Redirect to='/' />
      }
      if(this.state.showSecondForm){
        console.log(this.state)
        var form = (
          <div>
            <div>
              <h1>Just a bit more info!</h1>
              <div>
                <label for="name">Name</label>
              </div>
              <div>
                <input className="input-default" type="name" placeholder="First Last" name="name" onChange={this.handleChangeName} />
              </div>
            </div>

          <div>
            <div>
              <label for="birthday">Birthday</label>
            </div>
            <div>
              <input className="input-default" type="birthday" placeholder="MM/DD/YYYY" name="birthday" onChange={this.handleChangeBirthday} />
            </div>
          </div>

          <div>
            <div>
              <label for="diagnosis">Diagnosis(optional)</label>
            </div>
            <div>
              <input className="input-default" type="diagnosis" placeholder="Diagnosis" name="diagnosis" onChange={this.handleChangeDiagnosis} />
            </div>
          </div>
          <input className="btn-primary-solid" type="submit" value="Submit"/>
        </div>
        )

      }else{
        var form = (
        <div>
        <div>
          <div>
            <label for="email">Email</label>
          </div>
          <div>
            <input className="input-default" type="email" placeholder="email@email.com" name="email" onChange={this.handleChangeEmail} />
          </div>
        </div>

        <div>
          <div>
            <label for="password">Password</label>
          </div>
          <div>
            <input className="input-default" type="password" placeholder="password" name="password" onChange={this.handleChangePassword} />
          </div>
        </div>

        <button className="btn-primary-solid" onClick={this.handleFirstSubmit}>Continue</button>
      </div>
      )}
      return(
        <div className="div-backing">
        <form onSubmit={this.handleSubmit}>
          <h1 className="div-heading">I'm ready to help!</h1>
          {form}
          {/* <input className="btn-primary-solid" type="submit" value="Continue"/> */}
        </form>
      </div>
      )
    }
  }
  
export default Register;