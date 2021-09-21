import React, { Component } from "react";

export default class SelectWarehouse extends Component {
  constructor(props) {
    super(props);
    this.handleIdWarehouse = this.handleIdWarehouse.bind(this);
  }

  handleIdWarehouse = (event) => {
    const { value } = event.target;
    this.props.handleIdWarehouse(value);
    this.props.handleIdUser("");
  };
  render() {
    return (
      <div>
        <select
          className={
            this.props.isWarehouseValid === ""
              ? "custom-select"
              : this.props.isWarehouseValid
              ? "custom-select is-valid"
              : "custom-select is-invalid"
          }
          onChange={this.handleIdWarehouse}
        >
          <option>Select Warehouse</option>
          {this.props.warehouse.map((warehouse, idx) => {
            return (
              <option key={idx} value={warehouse.id_warehouse}>
                {warehouse.detail_address}
              </option>
            );
          })}
        </select>
        {this.props.isWarehouseValid ? (
          ""
        ) : (
          <span id="inputWarehouse-error" className="error invalid-feedback">
            Please provide a Warehouse!
          </span>
        )}
      </div>
    );
  }
}
