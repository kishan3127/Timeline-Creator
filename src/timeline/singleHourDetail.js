import React, { Fragment } from "react";
import { TextField, TextareaAutosize } from "@material-ui/core";
import Moment from "react-moment";

class SingleHourDetails extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="d-flex col-10">
          {/* {this.props.index !== 0 && (
            <span
              onClick={() => this.props.descrementBox(this.props.index)}
              className="minus"
            >
              -
            </span>
          )}
         */}
          <TextField
            defaultValue={this.props.single}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            className=" text-field-input margin-10 text-field "
            id="outlined-basic"
            onChange={(e) => this.props.handleChange(e, this.props.index)}
            label="Hours"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />
          {/* <TextareaAutosize
            aria-label="minimum height"
            type="textarea"
            onChange={(e) => this.props.handleDesciption(e, this.props.index)}
            label="Description"
            rowsMin={3}
            variant="outlined"
            placeholder="Add Description"
          /> */}
          <TextField
            defaultValue={this.props.description}
            className="width-100 text-field-input margin-10 width-50 text-field"
            label="Description"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            aria-label="minimum height"
            onChange={(e) => this.props.handleDesciption(e, this.props.index)}
            placeholder="Add Description"
          />
        </div>
        <div className="date col-2" key={this.props.index}>
          {this.props.datesPerHour ? (
            <Moment format="dd DD/MM/YYYY HH:mm">
              {this.props.datesPerHour}
            </Moment>
          ) : (
            "-"
          )}
        </div>
      </Fragment>
    );
  }
}
export default SingleHourDetails;
