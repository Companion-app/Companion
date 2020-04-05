import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import ReactModal from 'react-modal';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../styles/css/main.css';



class MedList extends React.Component{
    constructor(){
      super()
      this.state = {
        userSession: Session.get('user'),
        meds: {},
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        medSelected: '',
        editValue: '',
        addValue: '',
        notesValue: ''
      }
      this.onAddChange = this.onAddChange.bind(this);
      this.onNotesAddChange = this.onNotesAddChange.bind(this);
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
    }
  
    componentDidMount(){
      if(this.state.userSession) {
        axios.get('http://localhost:5000/get-meds', {
          params: { id: this.state.userSession['id'] },
          withCredentials: true
        }).then(res => this.setState({ meds: res.data.meds }))
      }
    }
  
    handleOpenAddModal() {
      this.setState({
        showAddModal: true
      });
    }
  
    handleOpenEditModal(med) {
      this.setState({
        showEditModal: true,
        medSelected: med
      });
    }
  
    handleOpenDeleteModal(med) {
      this.setState({
        showDeleteModal: true,
        medSelected: med
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

    onNotesAddChange(e){
      this.setState({
        notesValue: e.target.value
      })
    }
  
    onEditChange(e) {
      this.setState({
        editValue: e.target.value
      })
    }
  
    submitAdd() {
      axios.post('http://localhost:5000/add-med', 
      {id: this.state.userSession['id'], med: this.state.addValue, notes: this.state.notesValue},
      {withCredentials: true})
      .then(res => {
        let updatedMeds = this.state.meds;
        updatedMeds[this.state.addValue] = {}
        this.setState(prevState => ({
          showAddModal: false,
          meds: {
            ...prevState.meds,
            [this.state.addValue]: {}
          }
        }))
      })
    }
  
    submitEdit() {
      axios.put('http://localhost:5000/edit-med', {oldMed: this.state.medSelected, newMed: this.state.editValue}, { withCredentials: true })
        .then(res => {
        let updatedMeds = this.state.meds;
        let temp = updatedMeds[this.state.medSelected]
        delete updatedMeds[this.state.medSelected]
        updatedMeds[this.state.editValue] = temp
        this.setState({
          showEditModal: false,
          medSelected: '',
          meds: updatedMeds
        })
      })
    }
  
    submitConfirmDelete() {
      axios.post('http://localhost:5000/delete-med', {id: this.state.userSession['id'], med: this.state.medSelected}, { withCredentials: true })
        .then((res) => {
        let updatedMeds = this.state.meds
        delete updatedMeds[this.state.medSelected]
        this.setState({
          showDeleteModal: false,
          medSelected: '',
          meds: updatedMeds
        })
      })
    }
  
    render(){
      let i =0
      let meds = []
      for(let med in this.state.meds) {
        meds.push(med)
      }
      let medList = meds.map((med) =>
        <li key={i++}>
          {med}
          <Button onClick={() => {this.handleOpenEditModal(med)}}>Edit</Button>
          <Button onClick={() => {this.handleOpenDeleteModal(med)}}>Delete</Button>
        </li>)
      let modal;
      if(this.state.showAddModal) {
        modal =
        <ReactModal
          isOpen={this.state.showAddModal}
          contentLabel="Confirm delete med modal">
          <h1>Add a Medication</h1>

          <label for="add-med">Medication (max 20 characters) </label>
          <input class="input-default" type="text" name="add-med" onChange={this.onAddChange}/>
          <label for="add-med">Notes</label>
          <input class="input-default" type="text" name="add-notes" onChange={this.onNotesAddChange}/>
          <Button className="btn-secondary-default" onClick={this.submitAdd}>Add</Button>
          <Button className="btn-secondary-alert" onClick={this.handleCloseAddModal}>Cancel</Button>

        </ReactModal>
      }
      else if(this.state.showEditModal) {
        modal =
        <ReactModal
          isOpen={this.state.showEditModal}
          contentLabel="Confirm delete med modal">
          <h1>Edit a Medication</h1>
          <label for="edit-med">Medication (max 20 characters) </label>
          <input class="input-default" type="text" name="edit-med" onChange={this.onEditChange}/>
          <Button className="btn-secondary-default" onClick={this.submitEdit}>Edit</Button>
          <Button className="btn-secondary-alert" onClick={this.handleCloseEditModal}>Cancel</Button>
        </ReactModal>
      }
      else if(this.state.showDeleteModal) {
        modal =
        <ReactModal
          isOpen={this.state.showDeleteModal}
          contentLabel="Confirm delete med modal">
          <p>Are you sure you want to delete {this.state.medSelected}?</p>
          <Button className="btn-secondary-default" onClick={this.submitConfirmDelete}>Accept</Button>
          <Button className="btn-secondary-alert" onClick={this.handleCloseDeleteModal}>Cancel</Button>
        </ReactModal>
      }
      return (
        <div>
          <h1>Medications</h1>
          {modal}
          <ul>
            {medList}
          </ul>
          <Button className="btn-primary-solid" onClick={this.handleOpenAddModal}>Add Med</Button>
        </div>
      )
    }
  }

export default MedList;
  