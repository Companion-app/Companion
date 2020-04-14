import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import ReactModal from 'react-modal';
import SwipeableViews from 'react-swipeable-views';

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
      this.onSwipeChange = this.onSwipeChange.bind(this);
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

    onSwipeChange(index, indexLatest, meta){
      this.setState({
        swipeIndex: index
      })
    }
  
    render(){
      let i =0
      let meds = []
      console.log(this.state.meds)
      // console.log(this.state.meds[med])
      for(let med in this.state.meds) {
        meds.push(med)

      }
      let medList = meds.map((med) =>
        <li key={i++}>
          <SwipeableViews enableMouseEvents onChangeIndex={this.onSwipeChange}>
            <div>
              <Button className="hda-btn-primary-outline">
                {med}
              </Button>
              {/* MED NOTES */}
              <p className="hda-message">{this.state.meds[med]}</p>
              {/* <input className="hda-input-default">{this.state.meds[med]}</input> */}

            </div>
            <div>
              <Button className="hda-btn-secondary-edit" onClick={() => {this.handleOpenEditModal(med)}}>Edit</Button>
              <Button className="hda-btn-secondary-alert" onClick={() => {this.handleOpenDeleteModal(med)}}>Delete</Button>
            </div>
          </SwipeableViews>
        </li>)
      let modal;
      if(this.state.showAddModal) {
        modal =
        <ReactModal className="hdt-ModalBacking"
          isOpen={this.state.showAddModal}
          contentLabel="Confirm delete med modal">
          <h1 className="hda-DivHeading hda-CenterText">Add a Medication</h1>
          <form className="hdo-FormBacking row">
            <div>
              <label className="col-12" for="add-med">Medication Name </label>
              <input className="col-12 hda-input-default" type="text" name="add-med" onChange={this.onAddChange}/>
              <label className="col-12" for="add-med">Notes</label>
              <textarea className="col-12 hda-textarea-default" type="text" name="add-notes" onChange={this.onNotesAddChange}/>
            </div>
            <div>
              <Button className="col-6 hda-btn-secondary-default" onClick={this.submitAdd}>Add</Button>
              <Button className="col-6 hda-btn-secondary-alert" onClick={this.handleCloseAddModal}>Cancel</Button>
            </div>
          </form>
        </ReactModal>
      }
      else if(this.state.showEditModal) {
        modal =
        <ReactModal className="hdt-ModalBacking row"
          isOpen={this.state.showEditModal}
          contentLabel="Confirm delete med modal">
          <h1 className="hda-DivHeading hda-CenterText">Edit a Medication</h1>
          <form className="hdo-FormBacking row">
            <div>
              <label className="col-12" for="edit-med">Medication Name </label>
              <input className="col-12" class="hda-input-default" type="text" name="edit-med" onChange={this.onEditChange}/>
              <label className="col-12" for="edit-med-notes">Notes</label>
              <textarea className="col-12" class="hda-textarea-default" type="text" name="edit-med-notes" onChange={this.onNotesEditChange}/>
            </div>  
            <div>       
              <Button className="hda-btn-secondary-edit" onClick={this.submitEdit}>Edit</Button>
              <Button className="hda-btn-secondary-alert" onClick={this.handleCloseEditModal}>Cancel</Button>
            </div>  
          </form>
        </ReactModal>
      }
      else if(this.state.showDeleteModal) {
        modal =
        <ReactModal className="hdt-ModalBacking"
          isOpen={this.state.showDeleteModal}
          contentLabel="Confirm delete med modal">
          <IconContext.Provider value={{size: '2rem', color: 'black'}}>
            <form  className="hdo-DivBacking">
              <div className="hda-CenterText">
                <FaTrash/>
                <p>Are you sure you want to delete the medication <strong>{this.state.medSelected}</strong>?</p>
              </div>
              <div className="hda-CenterText">
                <Button className="hda-btn-secondary-default" onClick={this.submitConfirmDelete}>Accept</Button>
                <Button className="hda-btn-secondary-alert" onClick={this.handleCloseDeleteModal}>Cancel</Button>
              </div>
            </form>
          </IconContext.Provider>
        </ReactModal>
      }
      return (
        <div>
          <div>
            <h1 className="hda-DivHeading">Medications</h1>
          </div>
          <div className="hdo-DivBacking">
            {modal}

            <ul className="list-unstyled">
              {medList}
            </ul>
            <Button className="hda-btn-primary-outline" onClick={this.handleOpenAddModal}>ADD MED</Button>
          </div>
        </div>
      )
    }
  }

export default MedList;
  