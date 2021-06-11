import "./styles.css";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { differenceInHours, differenceInMinutes } from "date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";
import { Button } from "@material-ui/core";

import Header from "./header";
class MomentCustom extends React.Component {
  state = {
    login: new Date().setHours(9, 30, 0),
    lunchIn: new Date().setHours(13, 30, 0),
    logout: new Date().setHours(18, 30, 0),
    lunchOut: new Date().setHours(14, 0, 0),
    additional: new Date(),
    additionalOut: new Date(),
    calculation: "Not Calculated"
  };
  constructor(props) {
    super(props);
    this.calculateTheTime();
  }
  reset = () => {
    this.setState({
      login: new Date().setHours(9, 30, 0),
      lunchIn: new Date().setHours(13, 30, 0),
      logout: new Date().setHours(18, 30, 0),
      lunchOut: new Date().setHours(14, 0, 0),
      additional: new Date(),
      additionalOut: new Date(),
      calculation: "Not Calculated"
    });
    this.calculateTheTime();
  };
  differenceTime = (startTime, endTime) => {
    if (
      startTime === null ||
      startTime === "NaN:NaN" ||
      endTime === null ||
      endTime === "NaN:NaN"
    ) {
      return "0:0";
    }
    var hours = differenceInHours(endTime, startTime);
    var minutes = differenceInMinutes(endTime, startTime) % 60;
    // console.log(hours, minutes);
    return hours + ":" + minutes;
  };
  minus = (start, end) => {
    var startTime = start.split(":");
    var endTime = end.split(":");

    if (
      start === null ||
      start === "NaN:NaN" ||
      end === null ||
      end === "NaN:NaN"
    ) {
      return "0:0";
    }
    var hours = parseInt(startTime[0], 10) - parseInt(endTime[0], 10);
    var minutes = parseInt(startTime[1], 10) - parseInt(endTime[1], 10);
    if (minutes < 0) {
      minutes = minutes + 60;
      hours = hours - 1;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    // console.log(start, end, hours, minutes, "Minus");
    return hours + ":" + minutes;
  };
  plus = (start, end) => {
    var startTime = start.split(":");
    var endTime = end.split(":");

    var hours = parseInt(startTime[0], 10) + parseInt(endTime[0], 10);
    var minutes = parseInt(startTime[1], 10) + parseInt(endTime[1], 10);
    if (minutes >= 60) {
      minutes = minutes - 60;
      hours = hours + 1;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    // console.log(start, end, hours, minutes, "Plus");
    return hours + ":" + minutes;
  };
  calculateTheTime = () => {
    var self = this;
    setTimeout(function () {
      var {
        login,
        lunchIn,
        logout,
        lunchOut,
        additional,
        additionalOut
      } = self.state;
      var loginTime = self.differenceTime(login, logout);
      var lunchTime = self.differenceTime(lunchIn, lunchOut);
      var additionalTime = self.differenceTime(additional, additionalOut);
      // console.log(loginTime, lunchTime, additionalTime);
      var totalBreak = self.plus(lunchTime, additionalTime);
      var Result = self.minus(loginTime, totalBreak);
      // console.log(totalBreak, "totalBreak");
      self.setState({
        calculation: Result
      });
    }, 300);
  };

  onChange = (time, timeString, field) => {
    var self = this;
    this.setState({
      [field]: time
    });
    if (time) {
      self.calculateTheTime();
    }
  };

  render() {
    var timeDuration = [
      { name: "login", id: 1, title: "Login" },
      { name: "logout", id: 2, title: "Logout" },
      { name: "lunchIn", id: 3, title: "Lunch In" },
      { name: "lunchOut", id: 4, title: "Lunch Out" },
      { name: "additional", id: 5, title: "Additional In" },
      { name: "additionalOut", id: 6, title: "Additional Out" }
    ];
    return (
      <div className="container fixed-width">
        <Header title="Time Calculator"></Header>
        <div className="margin-bottom text-right">
          <Button
            style={{ background: "#fe4546" }}
            onClick={this.reset}
            variant="contained"
            color="primary"
          >
            Reset
          </Button>{" "}
        </div>
        <div className="d-flex margin-top">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {timeDuration.map((b, index) => {
              var currentState = b.name;
              return (
                <div className="single col-6" key={index}>
                  <div className="inner-container">
                    <span>{b.title}:</span>

                    <div className="KeyboardTimePicker">
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label={b.title}
                        value={
                          this.state[currentState] !== "" &&
                          this.state[currentState]
                        }
                        onChange={(time, timeString) =>
                          this.onChange(time, timeString, b.name)
                        }
                        KeyboardButtonProps={{
                          "aria-label": "change time"
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </MuiPickersUtilsProvider>
        </div>
        <div className="result">Result: {this.state.calculation}</div>
      </div>
    );
  }
}
export default MomentCustom;
