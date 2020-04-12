import React from 'react';

// https://react-icons.netlify.com/#/
import { IconContext } from 'react-icons';
import { FaBirthdayCake } from 'react-icons/fa';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userSession: Session.get('user'),
            name: '',
            birthday: '',
            diagnosis: ''
        }
    }

    componentDidMount(){
        if(this.state.userSession) {
            axios.post('http://localhost:5000/get-profile', {
                params: { id: this.state.userSession['id'] },
                withCredentials: true
            }).then(res => this.setState({
                name: res.data.name,
                birthday: res.data.birthday,
                diagnosis: rea.data.diagnosis
            }))
        }
      }
  
    render() {

        return (

            // to consider: edit button
            <IconContext.Provider value={{size: '.8rem', color: 'black'}}> 
            <div className="box-info">
                <h1 className=" ">
                    {this.state.name}
                    {/* Jane Doe */}
                </h1>
                <p className=" ">
                    <FaBirthdayCake />  
                    {this.state.birthday}
                    {/* Birthday: January 1 2000 */}
                </p>
                <div className=" ">
                    <h2>Diagnoses</h2>
                    {this.state.diagnosis}
                    {/* <ul>
                        <li>Depression</li>
                        <li>Bipolar</li>
                    </ul> */}
                </div>
            </div>
            </IconContext.Provider>

        );

    }
};

export default Profile;