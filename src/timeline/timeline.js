import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Grid, TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Moment from "react-moment";
import HoursList from "./hoursList";

class Timeline extends React.Component {
  state = {
    selectedDate: new Date().setUTCHours(4, 0, 0, 0),
    workingHour: 8,
    numberOfDeveloper: 1
  };
  handleDateChange = (date) => {
    var newDate = new Date(date).setUTCHours(4, 0, 0, 0);
    this.setState({
      selectedDate: newDate
    });
  };
  shouldComponentUpdate = () => {
    return true;
  };
  workingHourUpdate = (e) => {
    this.setState({
      workingHour: parseInt(e.target.value, 10)
    });
  };

  resetDate = () => {
    this.setState({
      selectedDate: new Date().setUTCHours(4, 0, 0, 0),
      numberOfDeveloper: 1
    });
  };

  noOfDeveloperChange = (e) => {
    this.setState({
      numberOfDeveloper: parseInt(e.target.value, 10)
    });
  };
  render() {
    return (
      <div className="wrapper margin-10">
        <div class="fixed-width mx-auto">
          <div className="d-flex align-top">
            <div className="col-6">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container>
                  <KeyboardDatePicker
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    style={{ color: "white" }}
                    id="date-picker-inline"
                    label="Select the initial date"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <div className="NoOfDevelopers">
                <TextField
                  defaultValue={this.state.numberOfDeveloper}
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: 100 } }}
                  className="text-field-input margin-10 text-field width-50"
                  id="outlined-basic"
                  onChange={(e) => this.noOfDeveloperChange(e)}
                  label="No. of Devs"
                  variant="outlined"
                />
              </div>
            </div>
            <div className="d-block text-right col-6">
              <div class="padding-10 margin-0">
                Selected Date :{" "}
                <Moment format="dd DD/MM/YYYY HH:mm">
                  {this.state.selectedDate}
                </Moment>
              </div>
              <div className="padding-10 margin-0">
                Working Hours : {this.state.workingHour}
                {/* <TextField
                  id="standard-basic"
                  defaultValue={this.state.workingHour}
                  onChange={this.workingHourUpdate}
                  label="Working Hour"
                  type="number"
                  className="width-50"
                  InputProps={{ inputProps: { min: 0, max: 24 } }}
                /> */}
              </div>
            </div>
          </div>
          <div className="">
            <HoursList
              numberOfDeveloper={this.state.numberOfDeveloper}
              resetDate={this.resetDate}
              workingHour={this.state.workingHour}
              selectedDate={this.state.selectedDate}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Timeline;
