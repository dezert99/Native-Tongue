import React, { Component } from 'react';
import {UserContext} from "../../../contexts/userContext"
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import _ from "lodash";
import About from "../about/about"
import LoginPage from "../login/login-page";
import SettingsPage from "../settings/settings-page";
import {Container, Col, Row} from "react-bootstrap";
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
                        <div style={{width: "100%"}}>
                            {this.showLogin? <LoginPage/> :
                                <SettingsPage/>
                            }
                        </div>
                    </Col>
                </Row>
              </Container>
            );
    }
}
HomePage.contextType = UserContext;

