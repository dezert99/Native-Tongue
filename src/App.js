import React from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { LinkContainer } from 'react-router-bootstrap'

import {Navbar, NavDropdown, Form, FormControl, Button, Container, Col, Row, Nav} from "react-bootstrap";

import "./styles/main.scss"
import "./styles/bootstrap-overrides.scss"

// import Sidebar from "./views/components/sidebar/sidebar"
import Routes from "./routes";


export default function App() {
  return (
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
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
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
  );
}

