import React, { Component } from 'react';
import {UserContext} from "../../../contexts/userContext"
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import About from "../about/about"
import LoginPage from "../login/login-page";
import {Container, Col, Row} from "react-bootstrap";

export default class HomePage extends Component {


    render() {
        
        return (
            <Container className = "body">
                <Row>
                    <Col sm={7}>
                        <div style={{width: "100%"}}>
                            <About/>
                        </div>
                    </Col>
                  
                  
                    <Col sm={5} xs={12}>
                        <div style={{width: "100%"}}>
                            <LoginPage/>
                        </div>
                    </Col>
                </Row>
              </Container>
            );
    }
}
HomePage.contextType = UserContext;

