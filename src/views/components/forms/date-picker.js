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

export default function MaterialUIDate(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(props.curr);
//   const updateTime = props.updateTime();
  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.updateTime(date)

  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

        <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Date"
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleDateChange}

        KeyboardButtonProps={{
            'aria-label': 'change date',
        }}
        />
        {/* {props.updateTime(selectedDate)} */}
    </MuiPickersUtilsProvider>
  );
}