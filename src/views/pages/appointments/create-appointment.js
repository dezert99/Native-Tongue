import React, {Component} from 'react';
import SettingsForm from "../../components/forms/settings-form"
import { Link } from 'react-router-dom'
import {UserContext} from '../../../contexts/userContext';
import {isEmpty} from "lodash";
import CreateAppointmentForm from "../../components/forms/create-appointment-form"



export default class CreateAppointment extends Component {
    componentDidMount(){
        if(isEmpty(this.context.user)) {
            window.location.href = "/"
        }
    }
    render() {

        return (
            <div>
                <CreateAppointmentForm />
            </div>
        );
    }
}
CreateAppointment.contextType = UserContext