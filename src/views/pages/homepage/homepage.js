import React, { Component } from 'react';
import {UserContext} from "../../../contexts/userContext"
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import _ from "lodash";
import About from "../about/about"
import LoginPage from "../login/login-page";
import SettingsPage from "../settings/settings-page";
import {Container, Col, Row} from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import {isEmpty} from 'lodash';

export default class HomePage extends Component {
    constructor(props, context){
        super(props);

        this.showLogin = _.isEmpty(context.user);

        this.state = {
            user: {},
        }
    }
    

    render() {
        
        let user = this.context.user
        console.log("USER:, ", user)
        return (
            <Container className = "body">
                <Row>
                    <Col sm={7}>
                        <div style={{width: "100%"}}>
                            <About/>
                        </div>
                    </Col>
                  
                  
                    <Col sm={5} xs={12}>
                    
                    <div style={{width: "100%",  marginTop: "15px"}}>
                        {this.showLogin? <LoginPage/> 
                        :
                        <Col>
                            <Row style={{marginLeft: "150px"}}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a3/USCIS_logo_English.svg" ></img>
                            </Row>
                            <Row  style={{marginTop: "50px" ,marginLeft: "80px"}}>
                                <img src="https://rampages.us/izdivine/wp-content/uploads/sites/8175/2015/10/15.jpg" width="290" height="400" opacity="5.0"></img>
                            </Row>
                        </Col>
                        }
                    </div>
                        
                    </Col>
                </Row>
              </Container>
            );
    }
}
HomePage.contextType = UserContext;


