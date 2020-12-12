import React, {Component} from 'react'
import {UserContext} from "../../../contexts/userContext"
import {Container, Col, Row, Card} from "react-bootstrap";
import AppointmentPanel from "../../components/appointments/appointments-panel";
import {get, isEmpty, isSet} from "lodash";
import axios from "axios";
import WelcomeScreen from "../chat/enter"
import ChatScreen from "../chat/chat"
import AppointmentDetail from "../../components/appointments/appointment-detail"

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
        this.state = {
            appointments: {},
            currentAppointment: {}
        }
    }

    componentDidMount() {
        console.log("initial render", this.context, this.state);
        this.retrieveAppointments();
    };

    updateCurrentAppointment = (id) => {
        if(!isEmpty(this.state.appointments.all[id])){
            this.setState({
                currentAppointment: this.state.appointments.all[id]
            }, console.log("updated",this.state));
        }
    }

    retrieveAppointments = () => {
        let appointments = axios.get(`/appointment/${this.context.user.type}`,{params : {user_id: this.context.user.user_id}})
        .then((response) => {
            console.log("resp", response);
            let appointments = response.data;
            if(isEmpty(this.state.currentAppointment)){
                this.setState(
                    {
                        appointments: appointments,
                    }
                )
            }
            else {
                let currAppointment = appointments.all[this.state.currentAppointment.appointment_id];
                this.setState(
                    {
                        appointments: appointments,
                        currentAppointment: currAppointment
                    }
                )
            }
           
            return response;
        })
        .catch(() => {
            console.log("an error has occured in appointment call");
        });
        console.log("appointments ", appointments);
    }

    render(){
        let {user} = this.context;
        return (
        <Container className = "body dashboard">
            <Row>
                <Col sm={5}>
                    <Row>
                        <div style={{width: "100%", marginTop: "10px"}}>
                            {!isEmpty(this.state.currentAppointment) ?
                            <AppointmentDetail appointment = {this.state.currentAppointment} retrieveAppointments={this.retrieveAppointments}>
                                <div className = "chat__container"><ChatScreen email={this.context.user.first_name} room={this.state.currentAppointment.appointment_id}/></div>
                            </AppointmentDetail>
                            : <Card><Card.Body>Please select an appointment to view its details.</Card.Body></Card>}
                        </div>
                    </Row>
                </Col>
                <Col sm={7} xs={12} style = {{marginTop: "10px"}}>
                    {this.context.user === false || isEmpty(this.state.appointments)? "" :
                        <AppointmentPanel user = {this.context.user} appointments={this.state.appointments}  updateApp ={this.updateCurrentAppointment}/>
                    }
                </Col>
            </Row> 
          </Container>
        )
    }
}
Dashboard.contextType = UserContext;