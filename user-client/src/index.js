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
class App extends React.Component{

  render(){
    const jwt = window.localStorage['jwt'];
    const role = window.localStorage['role'];

      return(
        <div>
          <Router>
            <Navbar expand bg="light" variant="light">
            <Navbar.Brand as={Link} to="/">
            CSB
            </Navbar.Brand>
            <Nav className="mr-auto">
              {
                role === 'ADMIN' ?
                [<Nav.Link as={Link} to="/users">
                  Users
                  </Nav.Link>]
                  : null
              }
              {
                role === 'HOUSE_OWNER' ?
                [<Nav.Link as={Link} to="/houses">
                Houses
                </Nav.Link>]
                : null
              }
              {
                role === 'HOUSE_OWNER' ?
                [<Nav.Link as={Link} to="/reservations">
                Reservations
                </Nav.Link>]
                : null
              }
                
            </Nav>
            {window.localStorage['jwt'] ? 
              <Nav.Link as={Link} style={{color: "purple"}} to="/profile">Go to your profile</Nav.Link>
              :null
            }
            {window.localStorage['jwt'] ? 
                    <Nav.Link onClick = {()=>logout()} style={{color: "purple"}}>Sign out</Nav.Link>
                    :
                    <Nav.Link as={Link} to="/signin" style={{color: "purple"}}>Sign in</Nav.Link>
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

