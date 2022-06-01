import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, HashRouter as Router, Routes } from 'react-router-dom';
import { Navbar, Nav, Container, Button} from 'react-bootstrap';
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
class App extends React.Component{

  isAccountApproved(){
    this.approved = window.localStorage.getItem['approved']
    console.log('Ovo je da li je approved')
    console.log(this.approved)
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
                role === 'HOUSE_OWNER'  && approved === 'true'  ?
                [<Nav.Link as={Link} to="/houses">
                Houses
                </Nav.Link>]
                : null
              }
              {
                role === 'HOUSE_OWNER'  && approved === 'true'  ?
                [<Nav.Link as={Link} to="/reservations">
                Reservations
                </Nav.Link>]
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
              </Routes>
            </Container>
          </Router>
        
        </div>
      )
      
  }
}

ReactDOM.render(
  <App/>,
  document.querySelector('#root')
);

