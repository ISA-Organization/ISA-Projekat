import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, HashRouter as Router, Routes } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Form, Row, Col} from 'react-bootstrap';
import Home from './components/Home';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signin/SignUp';
import Houses from './components/house/Houses';
import { logout } from './services/auth';
import EditHouse from './components/house/EditHouse';
import AddHouse from './components/house/AddHouse';
import UserList from './components/admin/UserList';
import ProfilePage from './components/ProfilePage';
import Calendar from './components/calendar/Calendar';
import AddAdditionalContent from './components/additional content/AddAdditionalContent';
import PasswordChange from './components/password change/PasswordChange';
import Boats from './components/boat/Boats';
import EditBoat from './components/boat/EditBoat';
import AddBoat from './components/boat/AddBoat';
import AddAvailablePeriod from './components/available period/AddAvailablePeriod'
import NewAdmin from './components/admin/NewAdmin';
import FirstAdminLogin from './components/admin/FirstAdminLogin';
import HouseToRent from './components/client/HouseToRent';
import AllReservationsForOwner from './components/reservation/AllReservationsForOwner'
import ClientProfileView from './components/client/ClientProfileView';
import EarningsInRange from './components/report/EarningsInRange';
import Adventure from './components/adventure/Adventures';
import AddAdventure from './components/adventure/AddAdventure';
import EditAdventure from './components/adventure/EditAdventure';
import MakeReservationByOwner from './components/reservation/MakeReservationByOwner'

import DeletionRequestForm from './components/deletionRequests/DeletionRequestForm';
import DeleteRequests from './components/admin/DeleteRequests';
import DenyDeleteRequestForm from './components/admin/DenyDeleteRequestForm';
import AllAvailablePeriodsForOwner from './components/available period/AllAvailablePeriodsForOwner';
import ReportContainer from './components/graph/ReportContainer'
import ClientReservationView from './components/reservation/ClientReservationView';
import EntityRating from './components/reservation/EntityRating';
import RatingList from './components/admin/RatingList';
import ComplaintsList from './components/admin/ComplaintsList';
import EntityComplaint from './components/reservation/EntityComplaint';
import ComplaintResponse from './components/admin/ComplaintResponse';
import CreateLoyaltyProgram from './components/admin/CreateLoyaltyProgram';
import PenaltyList from './components/admin/PenaltyList';
import BoatToRent from './components/client/BoatToRent';
import AdventureToRent from './components/client/AdventureToRent';
import ClientUpcomingReservationView from './components/reservation/ClientUpcomingReservationView';
class App extends React.Component{

  isAccountApproved(){
    this.approved = window.localStorage.getItem['approved']
 
    return this.approved;
  }
 

  render(){
    const jwt = window.localStorage['jwt'];
    const role = window.localStorage['role'];
    const approved = window.localStorage['approved'];
      return(
        <div>
          <Router>
            <Navbar expand bg="light" variant="light">
            <Navbar.Brand as={Link} to="/">
              <img src={require('./images/logo.png')}></img>
            </Navbar.Brand>
            <Nav className="mr-auto">
              {
                role == 'ADMIN' && approved === 'true' ? 
                [<Nav.Link as={Link} to="/users">
                  Users
                  </Nav.Link>]
                
                :null
                 }
              {
                role == 'HOUSE_OWNER'  && approved === 'true'  ?
                [<Nav.Link as={Link} to="/houses">
                Houses
                </Nav.Link>]
                : null
              }
              {
                role == 'INSTRUCTOR' && approved ==='true'?
                [<Nav.Link as={Link} to="/adventures">Adventures</Nav.Link>]
                : null
              }
              {
                role == 'BOAT_OWNER'  && approved === 'true'  ?
                [<Nav.Link as={Link} to="/boats">
                Boats
                </Nav.Link>]
                : null
              }
            
              {role == 'ADMIN' && approved === 'true' ?
                <Nav.Link as={Link} to="/deletionrequests">
                  Deletion Requests
                </Nav.Link>
                : null
              }
               {role === 'ADMIN' && approved === 'true' ?
                <Nav.Link as={Link} to="/allratings">
                  Rating Requests
                </Nav.Link>
                : null
              }
              {role === 'ADMIN' && approved === 'true' ?
                <Nav.Link as={Link} to="/allcomplaints">
                  Complaints
                </Nav.Link>
                : null
              }
              {role === 'ADMIN' && approved === 'true' ?
                <Nav.Link as={Link} to="/newloyalty">
                  New Loyalty Program
                </Nav.Link>
                : null
              }
               {role === 'ADMIN' && approved === 'true' ?
                <Nav.Link as={Link} to="/allcomments">
                  See penalties
                </Nav.Link>
                : null
              }
              {role === 'CLIENT' && approved === 'true' ?
                <Nav.Link as={Link} to="/client/reservationview">
                  Your reservations
                </Nav.Link>
                : null
              }
              {role === 'CLIENT' && approved === 'true' ?
                <Nav.Link as={Link} to="/client/upcomingreservations">
                  Upcoming reservations
                </Nav.Link>
                : null
              }

            </Nav>
            {window.localStorage['jwt']  && approved === 'true'  ? 
              <Nav.Link as={Link} to="/profile">Your profile</Nav.Link>
              :null
            }
            {window.localStorage['jwt'] && approved === 'true' ? 
                    
                    <Nav.Link style={{color:"rgba(0,0,0,.5)"}} onClick = {()=>logout()}>Sign out</Nav.Link>
                    :
                    <Nav.Link as={Link} to="/signin">Sign in</Nav.Link>
                }
            </Navbar>
            <Container style={{paddingTop:"10px"}}>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/users" element={<UserList/>}/>
                <Route path="/houses" element={<Houses/>}/>
                <Route path="/houses/add" element={<AddHouse/>}/>
                <Route path="/houses/:id" element={<EditHouse/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/calendar/:id" element={<Calendar/>}/>
                <Route path="/additionalContent/:entityId" element={<AddAdditionalContent/>}/>
                <Route path="/users/pass/:id" element={<PasswordChange/>}/>
                <Route path="/boats" element={<Boats/>}/>
                <Route path="/boats/:id" element={<EditBoat/>}/>
                <Route path="/boats/add" element={<AddBoat/>}/>
                <Route path="/newadmin" element={<NewAdmin/>}/>
                <Route path="/changepass" element={<FirstAdminLogin/>}/>
                <Route path="/addNewTerm/:id" element={<AddAvailablePeriod/>}/>
                <Route path="/clientProfileView/:id/:reservationId" element={<ClientProfileView/>}/>
                <Route path="/boats/boattorent/:id" element={<BoatToRent/>}/>
                <Route path='/client/upcomingreservations' element={<ClientUpcomingReservationView/>}/>
                <Route path="/clientProfileView/:id" element={<ClientProfileView/>}/>
                <Route path='/client/reservationview' element={<ClientReservationView/>}/>
                <Route path="/houses/housetorent/:id" element={<HouseToRent/>}/>
                <Route path="/periodsForOwner/:entityId" element={<AllAvailablePeriodsForOwner/>}/>
                <Route path="/reservationsForOwner/:entityId" element={<AllReservationsForOwner/>}/>
                <Route path="/earningsReport" element={<EarningsInRange/>}/>
                <Route path="/attendanceReport/:userId" element={<ReportContainer/>}/>
                <Route path="/adventures" element={<Adventure/>}/>
                <Route path="/houses/housetorent/:id" element={<HouseToRent/>}/>
                <Route path="/adventures/:id" element={<EditAdventure/>}/>
                <Route path="/adventures/adventuretorent/:id" element={<AdventureToRent/>}/>
                <Route path="/newReservation/:entityId" element={<MakeReservationByOwner/>}/>
                <Route path="/entity/rate/:id" element={<EntityRating/>}/>
                <Route path="/delete/request" element={<DeletionRequestForm/>}/>
                <Route path="/deletionrequests" element={<DeleteRequests/>}/>
                <Route path='/delete/request/:id' element={<DenyDeleteRequestForm/>}/>
                <Route path='/adventures/add' element={<AddAdventure/>}/>
                <Route path='/allratings' element={<RatingList/>}/>
                <Route path='/allcomplaints' element={<ComplaintsList/>}/>
                <Route path='/entity/complaint/:id' element={<EntityComplaint/>}/>
                <Route path='/complaint/respond/:id' element={<ComplaintResponse/>}/>
                <Route path='/newloyalty' element={<CreateLoyaltyProgram/>}/>
                <Route path='/allcomments' element={<PenaltyList/>}/>

              </Routes>
            </Container>
          </Router>
       
        </div>
      );
      
  }
}

ReactDOM.render(
  <App/>,
  document.querySelector('#root')
);

