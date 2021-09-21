import React, { Component } from "react";

export default class SelectUser extends Component {
  constructor(props) {
    super(props);
    this.handleIdUser = this.handleIdUser.bind(this);
  }

  handleIdUser = (event) => {
    const { value } = event.target;
    this.props.handleIdUser(value);
    this.props.handleIdWarehouse("")
  };
  render() {
    return (
      <div>
        {/* Select Warehouse */}

        <select
          className={
            this.props.isUserValid === ""
              ? "custom-select"
              : this.props.isUserValid
              ? "custom-select is-valid"
              : "custom-select is-invalid"
          }
          onChange={this.handleIdUser}
        >
          <option>Select User</option>
          {this.props.users.map((user, idx) => {
            return (
              <option key={idx} value={user.id_user}>
                {user.full_name}
              </option>
            );
          })}
        </select>
        {this.props.isUserValid ? (
          ""
        ) : (
          <span id="inputUser-error" className="error invalid-feedback">
            Please provide a User!
          </span>
        )}
      </div>
    );
  }
}
