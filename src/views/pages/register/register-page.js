import React, {Component} from 'react';
import RegisterForm from "../../components/forms/register-form"
import { Link } from 'react-router-dom'
import {UserContext} from '../../../contexts/userContext';
import {isEmpty} from "lodash";



export default class RegisterPage extends Component {
    componentDidMount(){
        if(!isEmpty(this.context.user)) {
            window.location.href = "/"
        }
    }
    render() {

        return (
            <div class="register-page">
                <h2>Register</h2>
                <RegisterForm />
                <p>Already have an account? <Link to="/signup">Login in here</Link></p>
            </div>
        );
    }
}
RegisterPage.contextType = UserContext