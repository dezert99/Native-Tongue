import React from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { LinkContainer } from 'react-router-bootstrap'

import {Navbar, NavDropdown, Form, FormControl, Button, Container, Col, Row, Nav, InputGroup} from "react-bootstrap";

import "./styles/main.scss"
import "./styles/bootstrap-overrides.scss"

import {UserContext} from "./contexts/userContext";

// import Sidebar from "./views/components/sidebar/sidebar"
import Routes from "./routes";


export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      user: {}
    }

    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  logout() {
    this.setState({user: {}});
  }

  login() {
    let username = this.usernameRef.current.value;
    let password = this.passwordRef.current.value;

    console.log(username,password);
  }

  render() {
    return (
      <UserContext.Provider value = {this.state.user}>
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
            <LinkContainer to="/">
              <Nav.Link>
                <Navbar.Brand >Native Tounge</Navbar.Brand> 
              </Nav.Link>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/about">
                  <Nav.Link>About</Nav.Link>
                </LinkContainer>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form>
            <Form.Row className="align-items-center">
              <Col xs="auto">
                <Form.Label htmlFor="inlineFormInput" srOnly>
                  Username
                </Form.Label>
                <Form.Control
                  className="mb-2"
                  id="username"
                  placeholder="Username"
                  ref = {this.usernameRef}
                />
              </Col>
              <Col xs="auto">
                <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                  Password
                </Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text></InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl id="password" placeholder="Password" ref = {this.passwordRef}/>
                </InputGroup>
              </Col>
              <Col xs="auto">
                <Button className="mb-2" onClick = {this.login}>
                  Submit
                </Button>
              </Col>
            </Form.Row>
          </Form>
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

