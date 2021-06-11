import "./styles.css";
import React from "react";

class Header extends React.Component {
  render() {
    return <p className="title">{this.props.title}</p>;
  }
}
export default Header;
