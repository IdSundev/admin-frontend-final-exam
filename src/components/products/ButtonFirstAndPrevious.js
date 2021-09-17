import React, { Component } from "react";

export default class ButtonFirstAndPrevious extends Component {
  render() {
    return (
      <div>
        <button className="btn btn-outline-primary">&#60;&#60;</button>
        &nbsp;
        <button className="btn btn-outline-primary">&#60;</button>
      </div>
    );
  }
}
