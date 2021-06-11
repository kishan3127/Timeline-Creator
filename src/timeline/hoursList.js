import React from "react";
import { Icon } from "@material-ui/core";
import { Button } from "@material-ui/core";
import SingleHourDetails from "./singleHourDetail";
import Entries from "./Entries";
var moment = require("moment-business-days");
moment.updateLocale("us", {
  workingWeekdays: [1, 2, 3, 4, 5]
});

var moment2 = require("moment-business-time");
moment2.locale("en", {
  workinghours: {
    0: null,
    1: ["09:30:00", "17:30:00"],
    2: ["09:30:00", "17:30:00"],
    3: ["09:30:00", "17:30:00"],
    4: ["09:30:00", "17:30:00"],
    5: ["09:30:00", "17:30:00"],
    6: null
  }
});
class HoursList extends React.Component {
  state = {
    workingHour: this.props.workingHour,
    totalHours: [0],
    todayDays: 0,
    datesAsPerHour: [this.props.selectedDate],
    hoursList: [0],
    details: [
      {
        hoursList: 0,
        description: "",
        datesAsPerHour: this.props.selectedDate
      }
    ]
  };

  componentDidUpdate = (prevProps, prevState) => {
    var self = this;
    if (prevProps.selectedDate !== this.props.selectedDate) {
      this.setState({
        details: self.updateStateDates(self.state.details, 0)
      });
    }
    if (prevState.totalHours !== this.state.totalHours) {
      this.setState({
        details: self.updateStateDates(self.state.details, 0)
      });
    }
  };
  updateStateDates = (detailsArray, index) => {
    var self = this;
    return detailsArray.map((b, i, array) => {
      var daysToAdd = parseInt(b.hoursList / self.props.workingHour, 10);
      var hoursToAdd = parseInt(b.hoursList % self.props.workingHour, 10);
      var newDateSingle =
        i === 0
          ? new Date(self.props.selectedDate)
          : new Date(detailsArray[i - 1].datesAsPerHour);

      !(index < array.length)
        ? newDateSingle.setHours(newDateSingle.getHours())
        : newDateSingle.setHours(newDateSingle.getHours());

      newDateSingle = moment2(newDateSingle).addWorkingTime(
        b.hoursList / this.props.numberOfDeveloper,
        "hours"
      )._d;
      // newDateSingle = moment(newDateSingle).businessAdd(daysToAdd)._d; // Wed Feb 04 2015 00:00:00 GMT-0600 (CST)

      b.datesAsPerHour = newDateSingle;
      if (!moment(newDateSingle).isBusinessDay()) {
        // Saturday
        newDateSingle = moment(newDateSingle).nextBusinessDay();
      }
      return { datesAsPerHour: newDateSingle, hoursList: b.hoursList };
    });
  };

  handleDateChange = (event, index) => {
    var self = this;
    // if (event.target.value != "") {
    let totalHours = this.state.totalHours;
    let item = { ...totalHours[index] };
    item = event.target.value < 0 ? 0 : parseInt(event.target.value, 10);
    totalHours[index] = isNaN(item) ? 0 : item;

    let detailsArray = this.state.details;
    let item2 = { ...detailsArray[index].hoursList };
    item2 = parseInt(event.target.value, 10);
    detailsArray[index].hoursList = isNaN(item2) ? 0 : item2;

    let item3 = { ...detailsArray[index].datesAsPerHour };

    var newDateSingle =
      index === 0
        ? new Date(self.props.selectedDate)
        : new Date(detailsArray[index - 1].datesAsPerHour);
    // newDateSingle.setHours(newDateSingle.getHours() + hoursToAdd);
    newDateSingle = moment2(newDateSingle).addWorkingTime(
      event.target.value / this.props.numberOfDeveloper,

      "hours"
    )._d;
    // newDateSingle = moment(newDateSingle).businessAdd(daysToAdd)._d;

    // newDateSingle = moment(newDateSingle).businessAdd(daysToAdd)._d; // Wed Feb 04 2015 00:00:00 GMT-0600 (CST)

    if (!moment(newDateSingle).isBusinessDay()) {
      newDateSingle = moment(newDateSingle).nextBusinessDay();
    }

    item3 = newDateSingle;
    detailsArray[index].datesAsPerHour = item3;

    var nextDate = self.updateStateDates(detailsArray, index);

    this.setState({
      details: nextDate,
      totalHours,
      hoursList: totalHours
    });
  };

  incrementBox = () => {
    var dateArr = [...this.state.datesAsPerHour];
    var detailsArry = [...this.state.details];
    var n = dateArr.length;
    this.setState({
      details: [
        ...this.state.details,
        { hoursList: 0, datesAsPerHour: detailsArry[n - 1].datesAsPerHour }
      ],
      hoursList: [...this.state.hoursList, 0],
      totalHours: [...this.state.totalHours, 0],
      datesAsPerHour: [...this.state.datesAsPerHour, dateArr[n - 1]]
    });
  };
  descrementBox = (index) => {
    var hoursList = this.state.hoursList;
    var datesAsPerHour = this.state.datesAsPerHour;
    var totalHours = this.state.totalHours;

    hoursList.splice(index, 1);
    datesAsPerHour.splice(index, 1);
    totalHours.splice(index, 1);
    this.setState({
      hoursList: hoursList,
      totalHours: datesAsPerHour,
      datesAsPerHour: totalHours
    });
  };

  handleDesciption = (event, index) => {
    let detailsArray = this.state.details;
    let description = { ...detailsArray[index].description };
    description = event.target.value;
    detailsArray[index].description = description;

    this.setState({
      details: detailsArray
    });
  };
  reset = () => {
    this.props.resetDate();

    this.setState({
      totalHours: [0],
      todayDays: 0,
      datesAsPerHour: [this.props.selectedDate],
      hoursList: [0],
      details: [
        {
          hoursList: 0,
          datesAsPerHour: this.props.selectedDate
        }
      ]
    });

    document.querySelector(".text-field-input input").value = 0;
  };

  render() {
    var self = this;
    // var sum = this.state.hoursToWork;
    var sum = this.state.totalHours.reduce((a, b) => a + b, 0);
    return (
      <div className="hoursList">
        <div className="margin-bottom text-right">
          <div className="d-flex align-center justify-end">
            <Button
              onClick={this.reset}
              variant="contained"
              color="primary"
              style={{ background: "#fe4546" }}
            >
              Reset
            </Button>
            <Entries
              localState={this.state}
              localProps={this.props}
              title="Generate Report"
            />
          </div>
        </div>
        <div className="margin-top-bottom d-flex space-between border-bottom border-up padding-10">
          <div className="default-size font-weight">Total Hours: {sum}</div>
          <div className="default-size font-weight">
            Number of Developers: {this.props.numberOfDeveloper}
          </div>
          <div className="default-size font-weight">
            Total Days:
            {this.state.totalHours === 0
              ? 0
              : parseFloat(
                  sum / this.props.workingHour / this.props.numberOfDeveloper
                ).toFixed(2) % 60}
          </div>
        </div>
        <div className="inputFieldWrapper d-flex">
          <div className="unstyled-list width-100 margin-0 padding-10">
            <div className="d-flex space-between font-weight">
              <div className="text-field-input margin-10">
                Task Estimated Hours
              </div>
              <div className="date font-weight">Task End Date</div>
            </div>
          </div>
          <ul className="unstyled-list width-100 margin-0 padding-10 margin-10 default-border ">
            {this.state.details.map(function (b, index) {
              return (
                <li
                  className="d-flex align-center space-between list--item"
                  key={`${index}_${b}`}
                >
                  <SingleHourDetails
                    arry={b.hoursList}
                    single={b.hoursList}
                    description={b.description}
                    updateTheDate={self.updateStateDates}
                    handleChange={self.handleDateChange}
                    index={index}
                    handleDesciption={self.handleDesciption}
                    descrementBox={self.descrementBox}
                    datesPerHour={b.datesAsPerHour}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="d-flex justify-center">
          <Icon
            tabIndex="0"
            onClick={() => this.incrementBox()}
            onKeyPress={() => this.incrementBox()}
            style={{
              color: "#fe4546",
              cursor: "pointer",
              fontSize: 30
            }}
          >
            add_circle
          </Icon>
        </div>
      </div>
    );
  }
}
export default HoursList;
