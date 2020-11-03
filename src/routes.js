import React, { Component } from 'react';
import {
    Switch,
    Route,
  } from "react-router-dom";


export default class Routes extends Component {
  

  render() {
    return (
        <Switch>
            {/* NOTE: / must be the last path in the switch */}
            <Route path="/">
                <Home />
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
  