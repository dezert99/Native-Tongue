import React, {Component} from 'react';
import SettingsForm from "../../components/forms/settings-form"
import { Link } from 'react-router-dom'
import {UserContext} from '../../../contexts/userContext';
import {isEmpty} from "lodash";



export default class SettingsPage extends Component {
    componentDidMount(){
        if(isEmpty(this.context.user)) {
            window.location.href = "/"
        }
    }
    render() {

        return (
            <div>
                <SettingsForm />
            </div>
        );
    }
}
SettingsPage.contextType = UserContext