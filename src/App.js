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
        window.location.href = "/";
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
                <Navbar.Brand >Native Tongue</Navbar.Brand> 
              </Nav.Link>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              {!isEmpty(this.state.user)?
                <LinkContainer to="/dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>: ""}
                <LinkContainer to="/faq">
                  <Nav.Link>FAQ</Nav.Link>
                </LinkContainer>
                
                {!isEmpty(this.state.user)?
                <LinkContainer to="/settings">
                  <Nav.Link>Settings</Nav.Link>
                </LinkContainer>: ""}
                  {!isEmpty(this.state.user) && this.state.user.type === "translator" ?
                    <LinkContainer to="/create-appointment">
                      <Nav.Link>Create Appointment Slot</Nav.Link>
                    </LinkContainer>
                 : "" }
                 <NavDropdown title="Relevant Agencies" id="basic-nav-dropdown">
                  <NavDropdown.Item href="https://www.uscis.gov/">US Citizens and Immigration Service</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="https://www.dhs.gov/">Department of Homeland Security</NavDropdown.Item>
                </NavDropdown>
                 
              </Nav>
            </Navbar.Collapse> 
            
            {!isEmpty(this.state.user)?<span>
                  Hello {this.state.user.first_name}
                <span class = "logout" onClick = {this.logout}> Logout</span>
                </span> : <Link to="/login">Login</Link>}
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

