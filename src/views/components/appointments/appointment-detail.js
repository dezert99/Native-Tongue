import React, {Component} from 'react';
import {Card, Button, Form} from 'react-bootstrap';
import sqlToJsDate from "../../../utils/date";
import {UserContext} from "../../../contexts/userContext";
import axios from 'axios';

const config = {
    headers: {
      'Content-Type': 'application/json'
    }
}

export default class AppointmentDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointment: props.appointment,
            description: props.appointment.description
        }

        this.descRef = React.createRef();
    }

    componentDidUpdate() {
        if(this.state.appointment != this.props.appointment){
            this.setState({
                appointment: this.props.appointment,
                description: this.props.appointment.description
            });
        }
    }

    handleChange = (event) => {
        let description = event.target.value;
        this.setState({description: description});
    }

    buttonClick = (endpoint, method, data) => {
        let {retrieveAppointments} = this.props;
        axios({
            method: method,
            url: endpoint,
            data: data,
            config: config
          })
        .then(function (response) {
            retrieveAppointments();
        //   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
        });
    }

    render() {
        const {appointment} = this.state;
        const {
            appointment_id,
            location,
            status,
            time_end,
            time_start,
            translator,
        } = appointment;
        let startTime = sqlToJsDate(time_start.replace("T"," ").replace("Z", ""));
        let endTime= sqlToJsDate(time_end.replace("T"," ").replace("Z", ""))
        const {user} = this.context;
        const time = `${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString().substring(0,5)}${startTime.toLocaleTimeString().substring(8)} - ${endTime.toLocaleDateString()} ${endTime.toLocaleTimeString().substring(0,5)}${endTime.toLocaleTimeString().substring(8)}`
        let buttons = [];

        if(status === "reserved") {
            buttons.push(<Button variant="danger" onClick={() => {
                this.buttonClick('/appointment/cancel/reservation', 'put', {appointmentId: appointment_id});
            }}>Cancel reservation</Button>);
        }
        if(status === "open" && user.type === "applicant") {
            buttons.push(<Button variant="primary" onClick={() => {
                let desc = document.querySelector("#reason").value;
                this.buttonClick('/appointment/request', 'put', {appointmentId: appointment_id, userId: user.user_id, reason: desc})
            }}>Reserve appointment</Button>);
        }
        if(status === "pending" && user.type==="applicant") {
            buttons.push(<Button variant="danger" onClick={() => {
                this.buttonClick('/appointment/cancel/reservation', 'put', {appointmentId: appointment_id});
            }}>Cancel reservation</Button>)
        }
        else if(status === "pending") {
            buttons.push(<Button variant="success" onClick={() => {
                this.buttonClick('/appointment/respond', 'put', {appointmentId: appointment_id, status:"reserved"});
            }}>Accept</Button>)
            buttons.push(<Button variant="danger" onClick={() => {
                this.buttonClick('/appointment/respond', 'put', {appointmentId: appointment_id, status: "open"});
            }}>Reject</Button>)
        }
        if(user.type === "translator") {
            buttons.push(<Button variant="danger" onClick={() => {
                this.buttonClick('/appointment/cancel', 'delete', {appointmentId: appointment_id});
            }}>Cancel appointment</Button>)
        }
        
        return (
            <Card className = "apt-detail">
                <Card.Header as="h5">Appointment</Card.Header>
                <Card.Body>
                    <Card.Title>{`Translator: ${translator.first_name} ${translator.last_name}`}</Card.Title>
                    <Card.Text>
                        <strong>Location</strong>: {location}
                    </Card.Text>
                    <Card.Text>
                        <strong>Time</strong>: {time}
                    </Card.Text>
                    <Card.Text>
                        <strong>Status</strong>: {status}
                    </Card.Text>
                    <Card.Text>
                        <strong>Reason for request</strong>:
                    </Card.Text>
                    <Form.Control as ="textarea" onChange={this.handleChange} id = "reason" value ={this.state.description === null ? "" : this.state.description} readOnly={user.type === "translator" || status === "reserved" || status === "pending"}>
                        
                    </Form.Control>
                    {buttons}
                </Card.Body>
                {this.props.children}
            </Card>
        )
    }
} 

AppointmentDetail.contextType = UserContext;
