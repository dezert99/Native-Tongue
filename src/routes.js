import React, { Component } from 'react';
import {
    Switch,
    Route,
  } from "react-router-dom";
import WelcomeScreen from "./views/pages/chat/enter"
import ChatScreen from "./views/pages/chat/chat"
import HomePage from "./views/pages/homepage/homepage";
import LoginPage from "./views/pages/login/login-page";
import RegisterPage from "./views/pages/register/register-page";
import Dashboard from "./views/pages/dashboard/dashboard";
import FrequentQuestions from './views/pages/about/faq';
import CreateAppointment from './views/pages/appointments/create-appointment.js';
import SettingsPage from './views/pages/settings/settings-page';

export default class Routes extends Component {
  

  render() {
    return (
        <Switch>
            {/* NOTE: / must be the last path in the switch */}
            <Route path="/test">
              <h2>This worked</h2>
            </Route>

            <Route exact path="/faq" >
                <FrequentQuestions/> 
            </Route>

            <Route exact path="/chat" component={ChatScreen} />
            <Route exact path="/enter" component={WelcomeScreen} />
            
            <Route exact path="/login" >
              <LoginPage/>
            </Route>
            
            <Route exact path="/create-appointment" >
              <CreateAppointment/>
            </Route>

            <Route path="/signup">
              <RegisterPage/>
            </Route>

            <Route path="/dashboard">
              <Dashboard/>
            </Route>
            <Route path="/settings">
              <SettingsPage />
            </Route>

            <Route path="/" >
              <HomePage/>
            </Route>
        </Switch>
        
    );
  }
}