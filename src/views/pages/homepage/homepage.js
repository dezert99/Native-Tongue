import React, { Component } from 'react';

export default class HomePage extends Component {
    constructor(props){
        super(props);
        let obj = {color: "blue", time: 34}

        this.state = {
            counter: 0

        }
        this.incrementCounter = this.incrementCounter.bind(this);
    }

    componentDidUpdate(prev, curr) {
        console.log("Hey I updated!", prev, curr);
    }

    incrementCounter() {
        console.log("in here!")
        this.setState(
            {
                counter: this.state.counter+1
            },
            console.log("test")
        )
    }

    render() {
        let name = this.props.name;

        return (
            <div className="home-container">
                <h2 className="home-container__welcome">Welcome {name}!</h2>
                <button onClick = {() => {this.incrementCounter()}}>Increment me!</button>
                <p>{this.state.counter}</p>
            </div>
            
        );
    }
}

