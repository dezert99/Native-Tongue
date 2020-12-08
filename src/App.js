import React from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { LinkContainer } from 'react-router-bootstrap'

import {Navbar, NavDropdown, Form, FormControl, Button, Container, Col, Row, Nav, InputGroup} from "react-bootstrap";

import "./styles/main.scss"
import "./styles/bootstrap-overrides.scss"

import {UserContext} from "./contexts/userContext";
import {read_cookie, delete_cookie} from "./utils/cookies"
import { Link } from 'react-router-dom'
import {isEmpty} from 'lodash';


// import Sidebar from "./views/components/sidebar/sidebar"
import Routes from "./routes";


export default class App extends React.Component {

  constructor(props){
    super(props);

    this.updateUserContext = (user) =>{
      console.log("Updating user =>",user);
      this.setState({
        user: user
      })
    }

    this.logout = () => {
      delete_cookie("user");
      setTimeout(1000);
      this.setState({
        user: {}
      }, () => {
        window.location.href = "/login";
      })
      
      
    }

    let user = {}

    if(read_cookie("user")){
      console.log("user cookie set", read_cookie("user"));
      user = read_cookie("user");
      // console.log(window.location.href)
    }

    this.state = {
      user: user,
      updateUser: this.updateUserContext,
      logout: this.logout
    }
  }

  render() {
    console.log("this",this.state.user);
    return (
      <UserContext.Provider value = {this.state}>
        <Router>
        <div>
          {/* <Navbar className = "navbar" variant="dark" sticky="top">
            <Container>
              {/* <Navbar.Brand href="#home"><img className = "navbar__logo" src={logo} alt = "eg logo"></img></Navbar.Brand> */}
              {/* <Nav className="mr-auto">
                */}
              {/* <LinkContainer to="/about"><Nav.Link >About </Nav.Link></LinkContainer> */}
              {/* </Nav> */}
              {/* <LoginButton/> */}
              {/* <Nav className="mr-auto">
                // <LinkContainer to="/"><Nav.Link >Home </Nav.Link></LinkContainer>
                <LinkContainer to="/about"><Nav.Link >About </Nav.Link></LinkContainer>
                <LinkContainer to="/users"><Nav.Link >Users </Nav.Link></LinkContainer>
                <LinkContainer to="/demo"><Nav.Link >Demo </Nav.Link></LinkContainer>
              </Nav>
            </Container>
          </Navbar> */}
  
          <Navbar bg="light" expand="lg">
            <LinkContainer to="/home">
              <Nav.Link>
                <Navbar.Brand >Native Tounge</Navbar.Brand> 
              </Nav.Link>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/faq">
                  <Nav.Link>FAQ</Nav.Link>
                </LinkContainer>
                <NavDropdown title="Relevant Agencies" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.3">US Citizens and Immigration Service</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Department of Homeland Security</NavDropdown.Item>
                </NavDropdown>
                  {!isEmpty(this.state.user)?<Col xs="auto">
                Hello {this.state.user.first_name}
                <span class = "logout" onClick = {this.logout}> Logout</span>
                </Col> : <Link to="/login">Login</Link>}
              </Nav>
            </Navbar.Collapse>
            
            
          </Navbar>
  
          <Container className = "body">
            <Row>
              <Col >
                <Routes />
              </Col> 
            </Row>
          </Container>
        </div>
      </Router>
      </UserContext.Provider>
    );
  }

  
}

