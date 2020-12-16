import React, {Component} from 'react';
import SettingsForm from "../../components/forms/settings-form"
import { Link } from 'react-router-dom'
import {UserContext} from '../../../contexts/userContext';
import {isEmpty} from "lodash";
import {Container, Col, Row} from "react-bootstrap";



export default class SettingsPage extends Component {
    componentDidMount(){
        if(isEmpty(this.context.user)) {
            window.location.href = "/"
        }
    }
    render() {

        return (
            <Container style={{marginTop: "10px"}} >
                    <h3>Personal Details and Preferences</h3>
                    <h4>If you wish to change any details please delete the current details and input your new details. </h4>
                    <h5>For any questions regarding data privacy please email: info@nativetongue.com</h5>
                <div style={{marginTop: "70px"}}>
                    <SettingsForm />
                </div>
            </Container>
        );
    }
}
SettingsPage.contextType = UserContext