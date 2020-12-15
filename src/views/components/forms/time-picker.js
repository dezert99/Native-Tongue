import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {Container, Form, Button, Alert, Row, Col} from "react-bootstrap";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUITime(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(props.curr);
//   const updateTime = props.updateTime();
  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.updateTime(date)

  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
        margin="normal"
        id="time-picker"
        label="Time"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
            'aria-label': 'change time',
        }}
        />
        {/* {props.updateTime(selectedDate)} */}
    </MuiPickersUtilsProvider>
  );
}