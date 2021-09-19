import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import ModalFailed from "../modal/admin/ModalFailed";
import ModalSuccess from "../modal/admin/ModalSuccess";
const modalFail = require("../../helpers/modalFailed");
const modalSuccess = require("../../helpers/modalSuccess");

export default class Add extends Component {
  componentDidMount() {
    this.getWarehouse();
  }

  constructor(props) {
    super(props);
    this.state = {
      warehouse: [],
      id_warehouse: "",
      isWarehouseValid: "",
      username: "",
      isUsernameValid: "",
      email: "",
      isEmailValid: "",
      password: "",
      isPasswordValid: "",
      passwordConfirm: "",
      isPasswordConfirmValid: "",
      fullName: "",
      isFullNameValid: "",
      gender: "L",
      contact: "",
      isContactValid: "",
    };
    this.getWarehouse = this.getWarehouse.bind(this);
    this.handleIdWarehouse = this.handleIdWarehouse.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
    this.handleFullName = this.handleFullName.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleContact = this.handleContact.bind(this);
  }

  getWarehouse = () => {
    axios
      .get(`${url_backend}/warehouse`)
      .then((res) => {
        this.setState({ warehouse: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleIdWarehouse = (event) => {
    const { value } = event.target;
    this.setState({ id_warehouse: event.target.value });
    value !== "Select Warehouse"
      ? this.setState({
          isWarehouseValid: true,
          id_warehouse: value,
        })
      : this.setState({
          isWarehouseValid: false,
          id_warehouse: "",
        });
  };

  handleUsername = (event) => {
    const { value } = event.target;
    this.setState({ username: value });
    this.state.username.length > 5
      ? this.setState({ isUsernameValid: true })
      : this.setState({ isUsernameValid: false });
  };

  handleEmail = (event) => {
    const { value } = event.target;
    this.setState({ email: value });
    this.state.email.length > 5
      ? this.setState({ isEmailValid: true })
      : this.setState({ isEmailValid: false });
    let validEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.state.email.match(validEmail)
      ? this.setState({ isEmailValid: true })
      : this.setState({ isEmailValid: false });
  };

  handlePassword = (event) => {
    const { value } = event.target;
    this.setState({ password: value });
    let validPassword = /^(?=.*[0-9])(?=.*[!@#\$%\^\&*\)\(+=._-])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/;
    this.state.password.match(validPassword)
      ? this.setState({ isPasswordValid: true })
      : this.setState({ isPasswordValid: false });
  };

  handlePasswordConfirm = (event) => {
    const { value } = event.target;
    this.setState({ passwordConfirm: value });
    this.state.password === this.state.passwordConfirm
      ? this.setState({ isPasswordConfirmValid: true })
      : this.setState({ isPasswordConfirmValid: false });
  };

  handleFullName = (event) => {
    const { value } = event.target;
    this.setState({ fullName: value });
    this.state.fullName.length > 5
      ? this.setState({ isFullNameValid: true })
      : this.setState({ isFullNameValid: false });
  };

  handleGender = (event) => {
    this.setState({ gender: event.target.value });
    // console.log(this.state.gender)
  };

  handleContact = (event) => {
    const { value } = event.target;
    this.setState({ contact: value });
  };

  handleSave = () => {
    if (
      this.state.id_warehouse === "" ||
      this.state.username === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.fullName === "" 
    ) {
      modalFail.LoadScript();

      return;
    }
    axios.post(`${url_backend}/admin`, {
        id_warehouse: this.state.id_warehouse,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        full_name: this.state.fullName,
        gender: this.state.gender,
        contact: this.state.contact
      })
      .then((res) => {
        modalSuccess.LoadScript();
        console.log("success")
      })
      .catch((err) => {
        modalFail.LoadScript();
        console.log("failed")
      });
  };

  render() {
    return (
      <div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                {/* general form elements */}
                <div className="card card-success mt-2">
                  <div className="card-header">
                    <h3 className="card-title">Add New Admin</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form>
                    <div className="card-body">
                      {/* warehouse  */}
                      <div className="form-group">
                        <label htmlFor="inputWarehouse">
                          Warehouse <span className="text-danger">*</span>
                        </label>
                        <select
                          className={
                            this.state.isWarehouseValid === ""
                              ? "custom-select"
                              : this.state.isWarehouseValid
                              ? "custom-select is-valid"
                              : "custom-select is-invalid"
                          }
                          value={this.state.id_warehouse}
                          onChange={this.handleIdWarehouse}
                        >
                          <option>Select Warehouse</option>
                          {this.state.warehouse.map((warehouse, idx) => {
                            return (
                              <option key={idx} value={warehouse.id_warehouse}>
                                {warehouse.detail_address}
                              </option>
                            );
                          })}
                        </select>
                        {this.state.isWarehouseValid ? (
                          ""
                        ) : (
                          <span
                            id="inputCategory-error"
                            className="error invalid-feedback"
                          >
                            Please provide a Warehouse!
                          </span>
                        )}
                      </div>
                      {/* username  */}
                      <div className="form-group">
                        <label htmlFor="inputUsername">
                          Username <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={
                            this.state.isUsernameValid === ""
                              ? "form-control"
                              : this.state.isUsernameValid
                              ? "form-control is-valid"
                              : "form-control is-invalid"
                          }
                          id="inputUsername"
                          placeholder="Enter Username..."
                          value={this.state.username}
                          onBlur={this.handleUsername}
                          onChange={this.handleUsername}
                        />
                        {this.state.isUsernameValid ? (
                          ""
                        ) : (
                          <span
                            id="inputName-error"
                            className="error invalid-feedback"
                          >
                            Please provide a Username! (character &ge; 5)
                          </span>
                        )}
                      </div>
                      {/* Full Name  */}
                      <div className="form-group">
                        <label htmlFor="inputFullName">
                          Fullname <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={
                            this.state.isFullNameValid === ""
                              ? "form-control"
                              : this.state.isFullNameValid
                              ? "form-control is-valid"
                              : "form-control is-invalid"
                          }
                          id="inputFullName"
                          placeholder="Enter Fullname..."
                          value={this.state.fullName}
                          onBlur={this.handleFullName}
                          onChange={this.handleFullName}
                        />
                        {this.state.isFullNameValid ? (
                          ""
                        ) : (
                          <span
                            id="inputFullName-error"
                            className="error invalid-feedback"
                          >
                            Please provide a Fullname! (character &ge; 5)
                          </span>
                        )}
                      </div>
                      {/* Email */}
                      <div className="form-group">
                        <label htmlFor="inputEmail">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className={
                            this.state.isEmailValid === ""
                              ? "form-control"
                              : this.state.isEmailValid
                              ? "form-control is-valid"
                              : "form-control is-invalid"
                          }
                          id="inputEmail"
                          placeholder="Enter Email..."
                          value={this.state.email}
                          onBlur={this.handleEmail}
                          onChange={this.handleEmail}
                        />
                        {this.state.isEmailValid ? (
                          ""
                        ) : (
                          <span
                            id="inputEmail-error"
                            className="error invalid-feedback"
                          >
                            Please provide a Valid Email! (character &ge; 5)
                          </span>
                        )}
                      </div>
                      {/* password  */}
                      <div className="form-group">
                        <label htmlFor="inputPassword">
                          Password <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className={
                            this.state.isPasswordValid === ""
                              ? "form-control"
                              : this.state.isPasswordValid
                              ? "form-control is-valid"
                              : "form-control is-invalid"
                          }
                          id="inputPassword"
                          placeholder="Enter Password..."
                          value={this.state.password}
                          onBlur={this.handlePassword}
                          onChange={this.handlePassword}
                        />
                        {this.state.isPasswordValid ? (
                          ""
                        ) : (
                          <span
                            id="inputPassword-error"
                            className="error invalid-feedback"
                          >
                            Password must be at least 6 letters, containing numbers & special characters!
                          </span>
                        )}
                      </div>
                      {/* password confirmation  */}
                      <div className="form-group">
                        <label htmlFor="inputPasswordConfirmation">
                          Password Confirmation <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className={
                            this.state.isPasswordConfirmValid === ""
                              ? "form-control"
                              : this.state.isPasswordConfirmValid
                              ? "form-control is-valid"
                              : "form-control is-invalid"
                          }
                          id="inputPasswordConfirm"
                          placeholder="Enter Password Confirmation..."
                          value={this.state.passwordConfirm}
                          onBlur={this.handlePasswordConfirm}
                          onChange={this.handlePasswordConfirm}
                        />
                        {this.state.isPasswordConfirmValid ? (
                          ""
                        ) : (
                          <span
                            id="inputPasswordConfirm-error"
                            className="error invalid-feedback"
                          >
                            Password not match!
                          </span>
                        )}
                      </div>
                      {/* gender  */}
                      <div className="form-group">
                        <label htmlFor="inputGender">
                          Gender
                        </label>
                        <select
                          className="custom-select"
                          onChange={this.handleGender}
                        >
                          <option value="L">Male</option>
                          <option value="P">Female</option>
                        </select>
                      </div>
                      {/* contact  */}
                      <div className="form-group">
                        <label htmlFor="inputContact">
                          Contact
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputContact"
                          placeholder="Enter Contact..."
                          value={this.state.contact}
                          onBlur={this.handleContact}
                          onChange={this.handleContact}
                        />
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.handleSave}
                      >
                        Create Admin
                      </button>
                    </div>
                  </form>
                </div>
                {/* /.card */}
              </div>
            </div>
          </div>
        </section>
        <ModalFailed message={"Please enter the data correctly!"} />
        <ModalSuccess message={"Data has been saved!"} />
      </div>
    );
  }
}
