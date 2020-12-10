import React, {Component} from 'react';
import {Card, Button, Form} from 'react-bootstrap'
import sqlToJsDate from "../../../utils/date"
import {UserContext} from "../../../contexts/userContext"


export default class AppointmentDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const {appointment} = this.props;
        const {
            appointment_id,
            description,
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
            buttons.push(<Button variant="danger">Cancel reservation</Button>);
        }
        if(status === "open" && user.type === "applicant") {
            buttons.push(<Button variant="primary">Reserve appointment</Button>);
        }
        if(status === "pending" && user.type==="applicant") {
            buttons.push(<Button variant="danger">Cancel reservation</Button>)
        }
        else if(status === "pending") {
            buttons.push(<Button variant="success">Accept</Button>)
            buttons.push(<Button variant="danger">Reject</Button>)
        }
        if(user.type === "translator") {
            buttons.push(<Button variant="danger">Cancel appointment</Button>)
        }
        
        return (
            <Card>
                <Card.Header as="h5">Appointment</Card.Header>
                <Card.Body>
                    <Card.Title>{`Translator: ${translator.first_name} ${translator.last_name}`}</Card.Title>
                    <Card.Text>
                        <strong>Location</strong>: {location}
                    </Card.Text>
                    <Card.Text>
                        <strong>Status</strong>: {status}
                    </Card.Text>
                    <Card.Text>
                        <strong>Reason for request</strong>:
                    </Card.Text>
                    <Form.Control as = "textarea" rows={4} readOnly={user.type === "translator" || status === "reserved"}>
                        {description}
                    </Form.Control>
                    {buttons}
                </Card.Body>
            </Card>
        )
    }
} 

AppointmentDetail.contextType = UserContext;
