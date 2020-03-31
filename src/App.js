import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  withRouter
} from 'react-router-dom';

import Profile from "./components/profile/profile";

class App extends React.Component{
  render(){  
return(
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/mood-list">Mood</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            {/* <li>
            <Link to="/profile">Profile</Link>
            </li> */}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/add-mood">
            <AddMood />
          </Route>
          <Route path="/mood-list">
            <MoodList />
          </Route>
          <Route path="/confirm-delete-mood/:id">
            <ConfirmDeleteMood {...this.state}/>
          </Route>
          <Route path="/edit-mood/:id">
            <EditMood {...this.state} />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
      </Router>
    )
  }
}

class MoodList extends React.Component{
  constructor(){
    super()
    this.state = {
      mood: [{'mood': ''}]
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/get-moods')
      .then(res => this.setState({mood: res.data.moods}))
  }


  render(){
    let i =0 
    const moodList = this.state.mood.map((mood)=>
      <li key={i++}>
      {mood.mood} 
      <Link to={`/edit-mood/${mood._id}`}><button>Edit</button></Link> 
      <Link to={`/confirm-delete-mood/${mood._id}`}><button>Delete</button></Link> 
      </li>
    )

    return (
      <div>
        <h1>Moods</h1>
        <ul>
          {moodList}
        </ul>
        <Link to="/add-mood"><button>Add a Mood</button></Link>
      </div>
    )
  }
}

class AddMood extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    axios.post('http://localhost:5000/add-mood', {
      mood: this.state.value
    }).then(res => console.log(res.data))
  this.setState({redirect : true})
  }
  
  render(){
    if(this.state.redirect){
      return(
        <Redirect to="/mood-list" />
      )
    } 

    return(
      <div>
        <h1>Add a Mood</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="mood" name="mood" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

function ConfirmDeleteMood() {
  return <InnerConfirmDeleteMood params={useParams()} />
}

class InnerConfirmDeleteMood extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      mood: '',
      redirect: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    axios.get('http://localhost:5000/delete-mood/' + this.state.id)
      .then(res => console.log(res.data))
    this.setState({redirect: true})
  }

  componentDidMount() {
    axios.get('http://localhost:5000/get-mood/' + this.props.params.id)
      .then(res => this.setState({
        mood: res.data['mood']['mood'],
        id: res.data['mood']['_id']
      }))
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/mood-list' />
    }
    return(
      <div>
        <h1>Delete a mood</h1>
        <form onSubmit={this.handleSubmit}>
            <p>Are you sure you want to Delete this Mood?</p>
            <div>{this.state.mood}</div>
            <input type="submit" value="Yes"/>
        </form>
      </div>
    )
  }
}

function EditMood() {
  return <InnerEditMood params={useParams()} />
}

class InnerEditMood extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      mood: '',
      value: '',
      redirect: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    console.log(this)
    this.setState({
      value: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    axios.put('http://localhost:5000/edit-mood/' + this.state.id, {
      mood: this.state.value
    }).then(res => console.log(res.data))
    this.setState({redirect: true})
  }

  componentDidMount() {
    axios.get('http://localhost:5000/get-mood/' + this.props.params.id)
    .then(res => this.setState({
      mood: res.data['mood']['mood'],
      id: res.data['mood']['_id']
    }))
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/mood-list' />
    }
    return (
      <div>
        <h1>Edit a Mood</h1>
        <form onSubmit={this.onSubmit}>
            <input type="text" placeholder={this.state.mood} value={this.state.value} onChange={this.onChange}/>
            <input type="submit" value="Edit" />
        </form>
      </div>
    )
  }
}

export default App;
