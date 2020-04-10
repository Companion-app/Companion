import React from 'react';
import axios from 'axios';
import Session from 'react-session-api';
import ReactModal from 'react-modal';
import SwipeableViews from 'react-swipeable-views';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Form, Dropdown } from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';
import Alert from '@material-ui/lab/Alert'
import '../../styles/css/main.css';
import { IconContext } from 'react-icons';
import { FaTrash } from 'react-icons/fa';

class MoodList extends React.Component{
    constructor(){
      super()
      this.state = {
        userSession: Session.get('user'),
        moods: {},
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        showIntensityModal: false,
        moodSelected: '',
        editValue: '',
        addValue: '',
        intensity: {},
        showAlert: false
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
      this.handleCloseIntensityModal = this.handleCloseIntensityModal.bind(this);
      this.onIntensityChange = this.onIntensityChange.bind(this);
      this.handleSubmitIntensity = this.handleSubmitIntensity.bind(this);
      this.onSwipeChange = this.onSwipeChange.bind(this);
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
          moods: updatedMoods,
          resetSwipe: true
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

    handleOpenIntensityModal(mood){
      this.setState({
        showIntensityModal: true,
        moodSelected: mood
      });
    }

    handleCloseIntensityModal (e){
      this.setState({ 
        showIntensityModal: false 
      });
    }

    handleSubmitIntensity(){
      axios.post('http://localhost:5000/add-logentry', 
        {id: this.state.userSession['id'], intensity: this.state.intensity}, 
        { withCredentials: true }
      ).then(res => {
        this.setState({
          showAlert : true,
          intensity: {}
        })

      })
    }

    onIntensityChange(e, value) {
      this.setState(prevState => ({
        intensity: {
          ...prevState.intensity,
          [`${this.state.moodSelected}`]: value
        }
      }))
      console.log(this.state.intensity)
    }

    onSwipeChange(index, indexLatest, meta){
      const index = index
    }
  
    render(){
      let i =0
      let moods = []
      for(let mood in this.state.moods) {
        moods.push(mood)
      }

      let index;
      if(resetSwipe){
        index = 0
      }


      let moodList = moods.map((mood) =>
        <li key={i++}>
          <SwipeableViews enableMouseEvents onChangeIndex={this.onSwipeChange}>
            <div>
              <Button className="btn-primary-outline" onClick={()=> {this.handleOpenIntensityModal(mood)}}>
                {mood}
              </Button>
            </div>
            <div>
              <Button className="btn-secondary-edit" onClick={() => {this.handleOpenEditModal(mood)}}>
                Edit
              </Button>
              <Button className="btn-secondary-alert" onClick={() => {this.handleOpenDeleteModal(mood)}}>
                Delete
              </Button>
            </div>
          </SwipeableViews>
        </li>)
      let modal;
      if(this.state.showAddModal) {
        modal =
        <ReactModal className="modal-backing"
          isOpen={this.state.showAddModal}
          contentLabel="Confirm delete mood modal">
          <h1 className="div-heading">Add a Mood</h1>
          <form className="form-backing row">
            <div>
              <label htmlFor="add-mood">Mood (max 20 characters) </label>
              <input className="input-default" type="text" name="add-mood" onChange={this.onAddChange}/>
            </div>
            <div>
              <Button className="btn-secondary-default" onClick={this.submitAdd}>Add</Button>
              <Button className="btn-secondary-alert" onClick={this.handleCloseAddModal}>Cancel</Button>
            </div>
          </form>
        </ReactModal>
      }
      else if(this.state.showEditModal) {
        modal =
        <ReactModal className="modal-backing"
          isOpen={this.state.showEditModal}
          contentLabel="Confirm delete mood modal">
          <h1 className="div-heading">Edit a Mood</h1>
          <form className="form-backing row">
            <div>
              <label htmlFor="edit-mood">Mood (max 20 characters) </label>
              <input className="input-default" type="text" name="edit-mood" onChange={this.onEditChange}/>
            </div>
            <div>
              <Button className="btn-secondary-default" onClick={this.submitEdit}>Edit</Button>
              <Button className="btn-secondary-alert" onClick={this.handleCloseEditModal}>Cancel</Button>
            </div>
          </form>
        </ReactModal>
      }
      else if(this.state.showDeleteModal) {
        modal =
        <ReactModal className="modal-backing"
          isOpen={this.state.showDeleteModal}
          contentLabel="Confirm delete mood modal">
          <IconContext.Provider value={{size: '2rem', color: 'black'}}>
          <form  className="div-backing">
            <div className="center">
              <FaTrash/>
              <p>Are you sure you want to delete <strong>{this.state.moodSelected}</strong>?</p>
            </div>
            <div className="center">
              <Button className="btn-secondary-default" onClick={this.submitConfirmDelete}>Accept</Button>
              <Button className="btn-secondary-alert" onClick={this.handleCloseDeleteModal}>Cancel</Button>
            </div>
          </form>
          </IconContext.Provider>
        </ReactModal>
      }
      else if(this.state.showIntensityModal) {
        modal = 
        <ReactModal className="modal-backing"
          isOpen={this.state.showIntensityModal}
          contentLabel="Set Intensity">
          <p>{this.state.moodSelected}</p>
          <Slider
            defaultValue={-1}
            // getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={1}
            marks
            min={0}
            max={5}
            onChange={this.onIntensityChange}
          />
          <Button className="btn-secondary-default" onClick={this.handleCloseIntensityModal}>Set</Button>
        </ReactModal>
      }
      let showSubmit;
      if (Object.keys(this.state.intensity).length > 0){
        showSubmit = <Button className="btn-primary-solid" onClick={this.handleSubmitIntensity}>LOG</Button>

      }

      let alert;
      if(this.state.showAlert){
        alert = 
        <Alert severity="success" onClose={()=>{ this.setState({showAlert: false}) }}>
          Your moods have been successfully logged!
        </Alert>
      }
    
      return (
        <div className="div-backing">
          <h1>Moods</h1>
          {modal}
          {alert}
          <ul className="list-unstyled">
            {moodList}
          </ul>
          <Button className="btn-primary-outline" onClick={this.handleOpenAddModal}>+</Button>
          {showSubmit}
        </div>
      )
    }
  }

export default MoodList;
  