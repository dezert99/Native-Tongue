import React, { Component } from 'react';
import {UserContext} from "../../../contexts/userContext"
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import About from "../about/about"
import LoginPage from "../login/login-page";
import SettingsPage from "../settings/settings-page";
import {Container, Col, Row} from "react-bootstrap";
import {isEmpty} from 'lodash';

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.updateUserContext = (user) =>{
            console.log("Updating user =>",user);
            this.setState({
                user: user
            })
            }
        this.state = {
          user: {},
          updateUser: this.updateUserContext,
          
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
                            {!isEmpty(user) ? <SettingsPage/> :
                                <LoginPage/>
                            }
                        </div>
                    </Col>
                </Row>
              </Container>
            );
    }
}
HomePage.contextType = UserContext;

