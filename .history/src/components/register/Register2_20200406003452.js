import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import { Redirect } from 'react-router-dom';


class Register2 extends React.Component {
    constructor() {
      super();
      this.state = {
        userSession: Session.get('user'),
        name: '',
        birthday: '',
        diagnosis: ''
      }
  
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeBirthday = this.handleChangeBirthday.bind(this);
      this.handleChangeDiagnosis = this.handleChangeDiagnosis.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
  
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
        </form>
      </div>
      )
    }
  }
  
export default Register2;