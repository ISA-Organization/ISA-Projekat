import React from 'react'
import '../index.css'
import AdminProfile from "./admin/AdminProfile"
import OwnerProfile from './owner/OwnerProfile';
import Axios from '../utils/Axios';
import InstructorProfile from "./instructor/InstructorProfile"
class ProfilePage extends React.Component {

    renderIsApproved(){
        let config = {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
              }
        console.log('Brate salje se zahtev')
        Axios.get('http://localhost:8080/api/users/approved', config)
        .then(res =>{
          localStorage.setItem('approved', res.data)
          this.setState({approvedUser : res.data})
          //console.log(this.approvedUser)
        }).catch(err => {
          console.log(err)
        })
      }

    renderSwitch(parma){
        switch(parma){
            case 'ADMIN':
                return <AdminProfile/>;
            case 'INSTRUCTOR':
                return <InstructorProfile/>;
            case 'HOUSE_OWNER':
                return <OwnerProfile/>;
            case 'BOAT_OWNER':
                    return <OwnerProfile/>;
            default:
                return null;
        }
    }
    
    render() {
        const role = window.localStorage['role'];
        this.renderIsApproved();

      return(
          <div className="bg">
              {this.renderSwitch(role)}
          </div>
      )
    }
  }
  
  export default ProfilePage;