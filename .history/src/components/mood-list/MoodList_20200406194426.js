import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import ReactModal from 'react-modal';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../styles/css/main.css';



class MoodList extends React.Component{
    constructor(){
      super()
      this.state = {
        userSession: Session.get('user'),
        moods: {},
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        moodSelected: '',
        editValue: '',
        addValue: '',
        intensity: '',
      }
      this.onAddChange = this.onAddChange.bind(this);
      this.onEditChange = this.onEditChange.bind(this);
      this.submitAdd = this.submitAdd.bind(this);
      this.submitEdit = this.submitEdit.bind(this);
      this.submitConfirmDelete = this.submitConfirmDelete.bind(this);
      this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
      this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
      this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
      this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
      this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
      this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
      this.handleOpenIntensityModal = this.handleOpenIntensityModal.bind(this);
    }
  
    componentDidMount(){
      if(this.state.userSession) {
        axios.get('http://localhost:5000/get-moods', {
          params: { id: this.state.userSession['id'] },
          withCredentials: true
        }).then(res => this.setState({ moods: res.data.moods }))
      }
    }
  
    handleOpenAddModal() {
      this.setState({
        showAddModal: true
      });
    }
  
    handleOpenEditModal(mood) {
      this.setState({
        showEditModal: true,
        moodSelected: mood
      });
    }
  
    handleOpenDeleteModal(mood) {
      this.setState({
        showDeleteModal: true,
        moodSelected: mood
      });
    }
  
    handleCloseAddModal() {
      this.setState({ showAddModal: false });
    }
  
    handleCloseEditModal () {
      this.setState({ showEditModal: false });
    }
  
    handleCloseDeleteModal () {
      this.setState({ showDeleteModal: false });
    }
  
    onAddChange(e) {
      this.setState({
        addValue: e.target.value
      })
    }
  
    onEditChange(e) {
      this.setState({
        editValue: e.target.value
      })
    }
  
    submitAdd() {
      axios.post('http://localhost:5000/add-mood', {id: this.state.userSession['id'], mood: this.state.addValue}, {withCredentials: true})
      .then(res => {
        let updatedMoods = this.state.moods;
        updatedMoods[this.state.addValue] = {}
        this.setState(prevState => ({
          showAddModal: false,
          moods: {
            ...prevState.moods,
            [this.state.addValue]: {}
          }
        }))
      })
    }
  
    submitEdit() {
      axios.put('http://localhost:5000/edit-mood', {oldMood: this.state.moodSelected, newMood: this.state.editValue}, { withCredentials: true })
        .then(res => {
        let updatedMoods = this.state.moods;
        let temp = updatedMoods[this.state.moodSelected]
        delete updatedMoods[this.state.moodSelected]
        updatedMoods[this.state.editValue] = temp
        this.setState({
          showEditModal: false,
          moodSelected: '',
          moods: updatedMoods
        })
      })
    }
  
    submitConfirmDelete() {
      axios.post('http://localhost:5000/delete-mood', {id: this.state.userSession['id'], mood: this.state.moodSelected}, { withCredentials: true })
        .then((res) => {
        let updatedMoods = this.state.moods
        delete updatedMoods[this.state.moodSelected]
        this.setState({
          showDeleteModal: false,
          moodSelected: '',
          moods: updatedMoods
        })
      })
    }

    handleOpenIntensityModal(){
      axios.post('http://localhost:5000/add-logentry', 
        {id: this.state.userSession['id'], mood: this.state.moodSelected}, 
        { withCredentials: true }
      )
    }
  
    render(){
      let i =0
      let moods = []
      for(let mood in this.state.moods) {
        moods.push(mood)
      }
      let moodList = moods.map((mood) =>
        <li key={i++}>
          <Button className="btn-primary-outline" onClick={()=> {this.handleOpenIntensityModal(mood)}}>
            {mood}
          </Button>
          <Button onClick={() => {this.handleOpenEditModal(mood)}}>Edit</Button>
          <Button onClick={() => {this.handleOpenDeleteModal(mood)}}>Delete</Button>
        </li>)
      let modal;
      if(this.state.showAddModal) {
        modal =
        <ReactModal className="modal-backing"
          isOpen={this.state.showAddModal}
          contentLabel="Confirm delete mood modal">
          <h1>Add a Mood</h1>

          <label htmlFor="add-mood">Mood (max 20 characters) </label>
          <input className="input-default" type="text" name="add-mood" onChange={this.onAddChange}/>
          <Button className="btn-secondary-default" onClick={this.submitAdd}>Add</Button>
          <Button className="btn-secondary-alert" onClick={this.handleCloseAddModal}>Cancel</Button>

        </ReactModal>
      }
      else if(this.state.showEditModal) {
        modal =
        <ReactModal className="modal-backing"
          isOpen={this.state.showEditModal}
          contentLabel="Confirm delete mood modal">
          <h1>Edit a Mood</h1>
          <label htmlFor="edit-mood">Mood (max 20 characters) </label>
          <input className="input-default" type="text" name="edit-mood" onChange={this.onEditChange}/>
          <Button className="btn-secondary-default" onClick={this.submitEdit}>Edit</Button>
          <Button className="btn-secondary-alert" onClick={this.handleCloseEditModal}>Cancel</Button>
        </ReactModal>
      }
      else if(this.state.showDeleteModal) {
        modal =
        <ReactModal className="modal-backing"
          isOpen={this.state.showDeleteModal}
          contentLabel="Confirm delete mood modal">
          <p>Are you sure you want to delete {this.state.moodSelected}?</p>
          <Button className="btn-secondary-default" onClick={this.submitConfirmDelete}>Accept</Button>
          <Button className="btn-secondary-alert" onClick={this.handleCloseDeleteModal}>Cancel</Button>
        </ReactModal>
      }
      return (
        <div className="div-backing">
          <h1>Moods</h1>
          {modal}
          <ul>
            {moodList}
          </ul>
          <Button className="btn-primary-solid" onClick={this.handleOpenAddModal}>Add Mood</Button>
        </div>
      )
    }
  }

export default MoodList;
  