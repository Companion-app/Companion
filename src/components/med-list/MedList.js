import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import ReactModal from 'react-modal';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../styles/css/main.css';

import { IconContext } from 'react-icons';
import { FaTrash } from 'react-icons/fa';



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
        notesValue: '',
        notesEditValue: ''
      }
      this.onAddChange = this.onAddChange.bind(this);
      this.onNotesAddChange = this.onNotesAddChange.bind(this);
      this.onEditChange = this.onEditChange.bind(this);
      this.onNotesEditChange = this.onNotesEditChange.bind(this);
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

        }).then(res => {
          console.log(res)
          this.setState({ 
            meds: res.data.meds 
          })
        })
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

    onNotesEditChange(e) {
      this.setState({
        notesEditValue: e.target.value
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
            [this.state.addValue]: this.state.notesValue
          }
        }))
      })
    }
  
    submitEdit() {
      axios.put('http://localhost:5000/edit-med', {id: this.state.userSession['id'], oldMed: this.state.medSelected, newMed: this.state.editValue, notes: this.state.notesEditValue}, { withCredentials: true })
        .then(res => {
        let updatedMeds = this.state.meds;
        let temp = updatedMeds[this.state.medSelected]
        delete updatedMeds[this.state.medSelected]
        // updatedMeds[this.state.editValue] = temp
        updatedMeds[this.state.editValue] = this.state.notesEditValue

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
      // console.log(this.state.meds)
      for(let med in this.state.meds) {
        meds.push(med)
      }
      let medList = meds.map((med) =>
        <li key={i++}>
          {med}
          {this.state.meds[med]}
          <Button className="btn-secondary-edit" onClick={() => {this.handleOpenEditModal(med)}}>Edit</Button>
          <Button className="btn-secondary-alert" onClick={() => {this.handleOpenDeleteModal(med)}}>Delete</Button>
        </li>)
      let modal;
      if(this.state.showAddModal) {
        modal =
        <ReactModal className="modal-backing"
          isOpen={this.state.showAddModal}
          contentLabel="Confirm delete med modal">
          <h1 className="div-heading">Add a Medication</h1>
          <form className="form-backing row">
            <div>
              <label className="col-12" for="add-med">Medication Name </label>
              <input className="col-12 input-default" type="text" name="add-med" onChange={this.onAddChange}/>
              <label className="col-12" for="add-med">Notes</label>
              <input className="col-12 input-default" type="text" name="add-notes" onChange={this.onNotesAddChange}/>
            </div>
            <div>
              <Button className="col-6 btn-secondary-default" onClick={this.submitAdd}>Add</Button>
              <Button className="col-6 btn-secondary-alert" onClick={this.handleCloseAddModal}>Cancel</Button>
            </div>
          </form>
        </ReactModal>
      }
      else if(this.state.showEditModal) {
        modal =
        <ReactModal className="modal-backing row"
          isOpen={this.state.showEditModal}
          contentLabel="Confirm delete med modal">
          <h1 className="div-heading">Edit a Medication</h1>
          <form className="form-backing row">
            <div>
              <label className="col-12" for="edit-med">Medication Name </label>
              <input className="col-12" class="input-default" type="text" name="edit-med" onChange={this.onEditChange}/>
              <label className="col-12" for="edit-med-notes">Notes</label>
              <input className="col-12" class="input-default" type="text" name="edit-med-notes" onChange={this.onNotesEditChange}/>
            </div>  
            <div>       
              <Button className="btn-secondary-edit" onClick={this.submitEdit}>Edit</Button>
              <Button className="btn-secondary-alert" onClick={this.handleCloseEditModal}>Cancel</Button>
            </div>  
          </form>
        </ReactModal>
      }
      else if(this.state.showDeleteModal) {
        modal =
        <ReactModal className="modal-backing"
          isOpen={this.state.showDeleteModal}
          contentLabel="Confirm delete med modal">
          <IconContext.Provider value={{size: '2rem', color: 'black'}}>
            <form  className="div-backing">
              <div className="center">
                <FaTrash/>
                <p>Are you sure you want to delete the emotion <strong>{this.state.medSelected}</strong>?</p>
              </div>
              <div className="center">
                <Button className="btn-secondary-default" onClick={this.submitConfirmDelete}>Accept</Button>
                <Button className="btn-secondary-alert" onClick={this.handleCloseDeleteModal}>Cancel</Button>
              </div>
            </form>
          </IconContext.Provider>
        </ReactModal>
      }
      return (
        <div className="div-backing">
          <h1>Medications</h1>
          {modal}

          <ul>
            {medList}
          </ul>

          <Button className="btn-primary-outline" onClick={this.handleOpenAddModal}>Add Med</Button>
        </div>
      )
    }
  }

export default MedList;
  