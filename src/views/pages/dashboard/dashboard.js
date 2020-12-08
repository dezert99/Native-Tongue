import React, {Component} from 'react'
import {UserContext} from "../../../contexts/userContext"
import {Container, Col, Row} from "react-bootstrap";
import AppointmentPanel from "../../components/appointments/appointments-panel";
import WelcomeScreen from "../chat/enter"
import ChatScreen from "../chat/chat"

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: false
        }
    }
    componentDidMount = async () => {
        console.log("initial render", this.context);
        this.setState({
            user: this.context.user
        })
    };
    componentDidUpdate(prevProps,prevState) {
        if(prevState.user !== this.state.user){
            console.log("Update: ",this.context)
            this.setState({
                user: this.context.user
            })
        }
    }

    render(){
        return (
        <Container className = "body">
            <Row>
                <Col sm={7}>
                    <div style={{width: "100%", border: "1px gray"}}>
                        {this.state.user === false ? "" :
                            <ChatScreen email={this.state.user.first_name} room={this.state.user.user_id}/>
                        }
                        
                    </div>
                </Col>
              
              
                <Col sm={5} xs={12}>
                    <AppointmentPanel />
                </Col>
            </Row>
          </Container>
        )
    }
}
Dashboard.contextType = UserContext;