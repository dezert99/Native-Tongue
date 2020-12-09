import React, {Component} from 'react'
import {UserContext} from "../../../contexts/userContext"
import {Container, Col, Row} from "react-bootstrap";
import AppointmentPanel from "../../components/appointments/appointments-panel";
import {get, isEmpty} from "lodash";
import axios from "axios";
import WelcomeScreen from "../chat/enter"
import ChatScreen from "../chat/chat"

const config = {
    headers: {
      'Content-Type': 'application/json'
    }
}

export default class Dashboard extends Component {
    constructor(props, context) {
        super(props);
        console.log("in constructor",context.user);
        if(isEmpty(context.user)) {
            window.location.href = "/login";
        }
    }

    componentDidMount() {
        console.log("initial render", this.context, this.state);
        let appointments = axios.get(`/appointment/${this.context.user.type}`,{params : {user_id: this.context.user.user_id}})
        .then((response) => {
            console.log("resp", response);
            return response;
        })
        .catch(() => {
            console.log("an error has occured in appointment call");
        });
        console.log("appointments ", appointments);
        
    };

    render(){
        return (
        <Container className = "body">
            <Row>
                <Col sm={4}>
                    <Row>
                        <div style={{width: "100%", border: "1px solid black"}}>
                            Details
                        </div>
                    </Row>
                    <Row>
                        <div style={{width: "100%", border: "1px gray"}}>
                            {this.context.user === false ? "" :
                                <ChatScreen email={this.context.user.first_name} room={this.context.user.user_id}/>
                            }
                            
                        </div>
                    </Row>
                    
                </Col>
            
                
              
                <Col sm={8} xs={12} style = {{marginTop: "10px"}}>
                    {this.context.user === false ? "" :
                        <AppointmentPanel user = {this.context.user}/>
                    }
                    
                </Col>
            </Row> 
          </Container>
        )
    }
}
Dashboard.contextType = UserContext;