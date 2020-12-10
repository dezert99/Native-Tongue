import React, {Component} from 'react';
import get from 'lodash';
import {Form, Button, Card, ListGroup} from "react-bootstrap";
import axios from 'axios'
import {Container, Col, Row} from "react-bootstrap";



const config = {
    headers: {
      'Content-Type': 'application/json'
    }
}




export default class AppointmentPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
        }

    }

    sqlToJsDate(sqlDate){
        //sqlDate in SQL DATETIME format ("yyyy-mm-dd hh:mm:ss.ms")
        var sqlDateArr1 = sqlDate.split("-");
        //format of sqlDateArr1[] = ['yyyy','mm','dd hh:mm:ms']
        var sYear = sqlDateArr1[0];
        var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
        var sqlDateArr2 = sqlDateArr1[2].split(" ");
        //format of sqlDateArr2[] = ['dd', 'hh:mm:ss.ms']
        var sDay = sqlDateArr2[0];
        var sqlDateArr3 = sqlDateArr2[1].split(":");
        //format of sqlDateArr3[] = ['hh','mm','ss.ms']
        var sHour = sqlDateArr3[0];
        var sMinute = sqlDateArr3[1];
        var sqlDateArr4 = sqlDateArr3[2].split(".");
        //format of sqlDateArr4[] = ['ss','ms']
        var sSecond = sqlDateArr4[0];
        
        return new Date(sYear,sMonth,sDay,sHour,sMinute,sSecond,0);
    }

    // Component or no component?
    generatateApt(appointment) {
        const startTime = this.sqlToJsDate(appointment.time_start.replace("T"," ").replace("Z", ""));
        const endTime = this.sqlToJsDate(appointment.time_end.replace("T"," ").replace("Z", ""))
        const {updateApp} = this.props;
        const content = `${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString().substring(0,5)}${startTime.toLocaleTimeString().substring(8)} - ${endTime.toLocaleDateString()} ${endTime.toLocaleTimeString().substring(0,5)}${endTime.toLocaleTimeString().substring(8)}`

        return ( 
            <ListGroup.Item> 
                <Button 
                    style={{width:"100%;"}}
                    variant="light" 
                    onClick={ () => 
                        {
                            console.log("appointment id clicked:",appointment.appointment_id); 
                            updateApp(appointment.appointment_id)
                        }
                    }>
                    {content}
                </Button>
            </ListGroup.Item>
        )
    }
    
    
    

    render(){
        let {appointments} = this.props;
        let {open, pending_accepted} = appointments;
 console.log("pending_accepted ", pending_accepted);
        console.log("open ", open);
        let openElems = []
        let pendingElems = [];
        open.forEach(app => {
            openElems.push(this.generatateApt(app));
        });
        pending_accepted.forEach(app => {
            pendingElems.push(this.generatateApt(app));
        });



        return (
            <Container className = "apppanel">
                <Row>
                    <Col sm={6}>
                        <Card style={{ width: '100%' }}>
                            <Card.Header>Scheduled/pending</Card.Header>
                            <ListGroup variant="flush">
                                {pendingElems}
                            </ListGroup>
                        </Card>
                        
                    </Col>
                    <Col sm={6} xs={12}>
                        <Card style={{ width: '100%' }}>
                            <Card.Header>Open</Card.Header>
                            <ListGroup variant="flush">
                                {openElems}
                            </ListGroup>
                        </Card>
                    </Col>
            </Row>
          </Container>
        )
    }
}