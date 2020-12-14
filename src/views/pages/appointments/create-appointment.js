import React, {Component} from 'react';
import SettingsForm from "../../components/forms/settings-form"
import { Link } from 'react-router-dom'
import {UserContext} from '../../../contexts/userContext';
import {isEmpty} from "lodash";
import CreateAppointmentForm from "../../components/forms/create-appointment-form"
import {Container, Col, Row} from "react-bootstrap";
import Faq from "react-faq-component" ;


const styles = {
    bgColor: 'white',
    titleTextColor: "black",
    rowTitleColor: "grey",
    rowContentColor: 'grey',
    font: "10px"
};
const config = {
    animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};



let faq_data = {
    
    rows: [
        {
            title: "Create as many meeting slots as possible.",
            content: "The more meeting slots you open up the more meetings will be requested. Native Tongue tries to accomodate the often tricky schedules of your customers. Please understand that they are in a precarious situation and might be strapped for time. Therefore setting slots at unusual times might enable more customers to utilize your assistance.",
        },
        {
            title: "Default 1 hour meetings slots. Feel free to change it!",
            content: 'Native Tongue automatically sets the meetings to a 1 hour length. This is because that is usually enough to accomodate our customers. If you feel a different meeting length fits your working style better feel free to change the ending time.',
        },
        {
            title: "You can always delete or edit slots on the dashboard.",
            content: 'Nothing is set in stone and things come up, we understand. Any and all meetings can be cancelled or edited in the dashboard. Just make sure when you accept a request you will be able to accomodate.',
        },
        {
            title: "Make sure to accept requested slots periodically on the dashboard.",
            content: 'Customers will start requesting the slots you create immediatly, therefore we ask that you periodically check your dashboard to accept the incomming requests. This way both you and your customers can plan their schedule in advance.',
        },
    ],
};



export default class CreateAppointment extends Component {
    componentDidMount(){
        if(isEmpty(this.context.user)) {
            window.location.href = "/"
        }
    }
    render() {

        return (
            <Container className = "body">
                <Row>
                    <Col sm={4} xs={12}>
                        <div style={{width: "100%"}}>
                            <CreateAppointmentForm />
                        </div>
                    </Col>
                    <Col>

                        <Faq data={faq_data} styles={styles} config={config} />

                    </Col>
                </Row>
              </Container>
            );
    }
}
CreateAppointment.contextType = UserContext