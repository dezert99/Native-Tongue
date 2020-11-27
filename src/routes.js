import React, { Component } from 'react';
import {
    Switch,
    Route,
  } from "react-router-dom";
import HomePage from "./views/pages/homepage/homepage"
import LoginPage from "./views/pages/login/login-page"
import RegisterPage from "./views/pages/register/register-page"

export default class Routes extends Component {
  

  render() {
    return (
        <Switch>
            {/* NOTE: / must be the last path in the switch */}
            <Route path="/test">
              <h2>This worked</h2>

            </Route>
            
            <Route path="/login" >
              <LoginPage/>
            </Route>

            <Route path="/signup">
              <RegisterPage/>
            </Route>

            <Route path="/" >
              <HomePage name = "Emilia" />
            </Route>

            
            
        </Switch>
    );
  }
}