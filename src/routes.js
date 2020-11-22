import React, { Component } from 'react';
import {
    Switch,
    Route,
  } from "react-router-dom";
import HomePage from "./views/pages/homepage/homepage"
import About from "./views/pages/about/about"

export default class Routes extends Component {
  

  render() {
    return (
        <Switch>
            {/* NOTE: / must be the last path in the switch */}
            <Route path="/test">
              <h2>This worked</h2>

            </Route>
            <Route path="/home" >
                <HomePage name = "Emilia" />
            </Route>
            <Route exact path="/about" >
               <About/> 
            </Route>
            
        </Switch>
        
    );
  }
}

function Home() {
    return (
    <div>
      <h2>Welcome to Native Tounge</h2>
    </div>
    );
  }
  