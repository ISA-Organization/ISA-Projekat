import React from 'react'
import '../index.css'
import AdminProfile from "./admin/AdminProfile"
import InstructorProfile from "./instructor/InstructorProfile"
class ProfilePage extends React.Component {

    renderSwitch(parma){
        switch(parma){
            case 'ADMIN':
                return <AdminProfile/>;
            case 'INSTRUCTOR':
                return <InstructorProfile/>;
            default:
                return null;
        }
    }
    
    render() {
        const role = window.localStorage['role'];

      return(
          <div className="bg">
              <h1 class="display-4" style={{color: "black", marginLeft: "22%"}}>This is your profile page</h1>
              {this.renderSwitch(role)}
          </div>
      )
    }
  }
  
  export default ProfilePage;