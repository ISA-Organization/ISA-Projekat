import React from 'react'
import '../index.css'
import AdminProfile from "./admin/AdminProfile"
import InstructorProfile from "./instructor/InstructorProfile"
import OwnerProfile from './owner/OwnerProfile'

class ProfilePage extends React.Component {

    // renderSwitch(parma){
    //     switch(parma){
    //         case 'ADMIN':
    //             return <AdminProfile/>;
    //         case 'INSTRUCTOR':
    //             return <InstructorProfile/>;
    //         case 'HOUSE_OWNER':
    //             return <OwnerProfile/>;
    //         case 'BOAT_OWNER':
    //             return <OwnerProfile/>;
    //         default:
    //             return null;
    //     }
    // }
    
    render() {
        const role = window.localStorage['role'];

      return(
          <div className="bg">
              {/* {this.renderSwitch(role)} */}
             <OwnerProfile/>;
          </div>
      )
    }
  }
  
  export default ProfilePage;