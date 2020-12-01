import React, {Component} from 'react'
import {UserContext} from "../../../contexts/userContext"
import {Container, Col, Row} from "react-bootstrap";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render(){
        return (
        <Container className = "body">
            <Row>
                <Col sm={7}>
                    <div style={{width: "100%", border: "1px solid black"}}>
                        other contnet
                    </div>
                </Col>
              
              
                <Col sm={5} xs={12}>
                    <div style={{width: "100%", border: "1px solid black"}}>
                        comp
                    </div>
                </Col>
            </Row>
          </Container>
        )
    }
}
Dashboard.contextType = UserContext;