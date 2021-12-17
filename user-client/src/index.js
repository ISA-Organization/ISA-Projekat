import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, HashRouter as Router, Routes } from 'react-router-dom';
import { Navbar, Nav, Container} from 'react-bootstrap';
import Home from './components/Home';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signin/SignUp';

class App extends React.Component{

  render(){
      return(
        <div>
          <Router>
            <Navbar expand bg="light" variant="light">
            <Navbar.Brand as={Link} to="/">
            CSB
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/signin">
                    Sign in
                </Nav.Link>
            </Nav>
            </Navbar>
            <Container style={{paddingTop:"10px"}}>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
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

