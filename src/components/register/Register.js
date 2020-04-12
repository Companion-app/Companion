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
        var form = (
          <div>
            <div className="hda-CenterText">
              <h1 className="hda-DivHeading">Just a bit more info!</h1>
              <img className="hda-Logo" width="40%" src="/assets/companion-logo.png" />
            </div>
            <form className="hdo-DivBacking">
                <label htmlFor="name">Name</label>

                <input className="hda-input-default" type="name" placeholder="First Last" name="name" value={this.state.name} onChange={this.handleChangeName} />
              <label htmlFor="birthday">Birthday</label>

              <input className="hda-input-default" type="birthday" placeholder="MM/DD/YYYY" name="birthday" value={this.state.birthday} onChange={this.handleChangeBirthday} />
              <label htmlFor="diagnosis">Diagnosis (optional)</label>

              <input className="hda-input-default" type="diagnosis" placeholder="Diagnosis" name="diagnosis" value={this.state.diagnosis} onChange={this.handleChangeDiagnosis} />

          <input className="hda-btn-primary-solid" type="submit" value="Submit"/>
        </form>
        </div>
        // </div>
        )

      }else{
        var form = (
        <div>
          <div className="hda-CenterText">
            <h1 className="hda-DivHeading">I'm ready to help!</h1>
            <img className="hda-Logo" width="40%" src="/assets/companion-logo.png" />
          </div>
            <form className="hdo-DivBacking">
              <label for="email">Email</label>
              <input className="hda-input-default" type="email" placeholder="email@email.com" name="email" value={this.state.email} onChange={this.handleChangeEmail} />
            
              <label for="password">Password</label>
              <input className="hda-input-default" type="password" placeholder="password" name="password" value={this.state.password} onChange={this.handleChangePassword} />

              <button className="hda-btn-primary-solid" onClick={this.handleFirstSubmit}>Continue</button>
            </form>
      </div>
      )}
      return(
        // <div className="hdo-DivBacking">
        <form onSubmit={this.handleSubmit}>
          {/* <h1 className="hda-DivHeading">I'm ready to help!</h1> */}
          {form}
          {/* <input className="hda-btn-primary-solid" type="submit" value="Continue"/> */}
        </form>
      // </div>
      )
    }
  }
  
export default Register;