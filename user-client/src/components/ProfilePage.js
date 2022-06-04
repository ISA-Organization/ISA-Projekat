import React from 'react'
import '../index.css'
import AdminProfile from "./admin/AdminProfile"
import HouseOwnerProfile from './owner/HouseOwnerProfile';
import InstructorProfile from "./instructor/InstructorProfile"
class ProfilePage extends React.Component {

    renderSwitch(parma){
        switch(parma){
            case 'ADMIN':
                return <AdminProfile/>;
            case 'INSTRUCTOR':
                return <InstructorProfile/>;
            case 'HOUSE_OWNER':
                return <HouseOwnerProfile/>;
            default:
                return null;
        }
    }
    
    render() {
        const role = window.localStorage['role'];

      return(
          <div className="bg">
              {this.renderSwitch(role)}
          </div>
      )
    }
  }
  
  export default ProfilePage;