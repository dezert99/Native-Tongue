import React, {Component} from 'react';
import {ListGroup, Button} from 'react-bootstrap'

export class AppointmentSlot extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const {aptDetails, onclick} = this.props;
        return (
            <ListGroup.Item>
                <Button style={{width:"100%;"}} variant="light" onclick={onclick}>{aptDetails}</Button>
            </ListGroup.Item>
        )
    }
} 
