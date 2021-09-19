import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import ModalFailed from "../modal/warehouse/ModalFailed";
import ModalSuccess from "../modal/warehouse/ModalSuccess";
import "../../assets/css/style.css";
const modalFail = require("../../helpers/modalFailed");
const modalSuccess = require("../../helpers/modalSuccess");

export default class Add extends Component {
  componentDidMount() {
    this.getProvince();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.id_province !== prevState.id_province) {
      this.getCity(this.state.id_province);
    }
    if (this.state.id_city !== prevState.id_city) {
      this.getDistrict(this.state.id_city);
    }
    if (this.state.id_district !== prevState.id_district) {
      this.getVillage(this.state.id_district);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      province: [],
      id_province: "",
      isProvinceValid: "",
      city: [],
      id_city: "",
      isCityValid: "",
      district: [],
      id_district: "",
      isDistrictValid: "",
      village: [],
      image: "https://fakeimg.pl/350x200/",
      profile: "",
      isProfileValid: "",
      detail_address: "",
      isDetailAddressValid: "",
      other_detail: "",
      isOtherDetailValid: "",
      id_village: "",
      isVillageValid: "",
    };
    this.handleProvince = this.handleProvince.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleDistrict = this.handleDistrict.bind(this);
    this.handleDetailAddress = this.handleDetailAddress.bind(this);
    this.handleOtherDetail = this.handleOtherDetail.bind(this);
    this.getProvince = this.getProvince.bind(this);
    this.getCity = this.getCity.bind(this);
    this.getDistrict = this.getDistrict.bind(this);
    this.getVillage = this.getVillage.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  getProvince = () => {
    axios
      .get(`${url_backend}/province`)
      .then((res) => {
        this.setState({ province: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleProfile = (event) => {
    const value = event.target.files[0];
    value
      ? this.setState({
          isProfileValid: true,
          image: URL.createObjectURL(value),
          profile: value,
        })
      : this.setState({
          isProfileValid: false,
          image: "https://fakeimg.pl/350x200/",
          profile: "",
        });
  };

  handleProvince = (event) => {
    const { value } = event.target;
    this.setState({
      id_province: event.target.value,
      city: [],
      id_city: "",
      isCityValid: "",
      district: [],
      id_district: "",
      isDistrictValid: "",
      village: [],
      id_village: "",
    });
    value !== "Select Province"
      ? this.setState({
          isProvinceValid: true,
          id_province: value,
        })
      : this.setState({
          isProvinceValid: false,
          id_province: "",
        });
  };

  getCity = (id_province) => {
    // console.log(id_province);
    axios
      .get(`${url_backend}/city?province=${id_province}`)
      .then((res) => {
        this.setState({ city: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCity = (event) => {
    const { value } = event.target;
    this.setState({
      id_city: event.target.value,
      district: [],
      id_district: "",
      isDistrictValid: "",
      village: [],
      id_village: "",
    });
    value !== "Select City"
      ? this.setState({
          isCityValid: true,
          id_city: value,
        })
      : this.setState({
          isCityValid: false,
          id_city: "",
        });
  };

  getDistrict = (id_city) => {
    // console.log(id_city);
    axios
      .get(`${url_backend}/district?city=${id_city}`)
      .then((res) => {
        this.setState({ district: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleDistrict = (event) => {
    const { value } = event.target;
    this.setState({
      id_district: event.target.value,
      village: [],
      id_village: "",
    });
    value !== "Select District"
      ? this.setState({
          isDistrictValid: true,
          id_district: value,
        })
      : this.setState({
          isDistrictValid: false,
          id_district: "",
        });
  };

  getVillage = (id_district) => {
    // console.log(id_district);
    axios
      .get(`${url_backend}/village?district=${id_district}`)
      .then((res) => {
        this.setState({ village: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleVillage = (event) => {
    const { value } = event.target;
    this.setState({
      id_village: event.target.value,
    });
    value !== "Select Village"
      ? this.setState({
          isVillageValid: true,
          id_village: value,
        })
      : this.setState({
          isVillageValid: false,
          id_village: "",
        });
  };

  handleDetailAddress = (event) => {
    const { value } = event.target;
    this.setState({ detail_address: value });
    this.state.detail_address.length > 5
      ? this.setState({ isDetailAddressValid: true })
      : this.setState({ isDetailAddressValid: false });
  };

  handleOtherDetail = (event) => {
    const { value } = event.target;
    this.setState({ other_detail: value });
    this.state.other_detail.length > 5
      ? this.setState({ isOtherDetailValid: true })
      : this.setState({ isOtherDetailValid: false });
  };

  handleSave = () => {
    if (
      this.state.profile === "" ||
      this.state.id_village === "" ||
      this.state.detail_address === "" ||
      this.state.other_detail === "" 
    ) {
      modalFail.LoadScript();

      return;
    }
    const formData = new FormData();

    formData.append("id_village", this.state.id_village);
    formData.append("other_detail", this.state.other_detail);
    formData.append("detail_address", this.state.detail_address);
    formData.append("profile", this.state.profile);
    axios
      .post(`${url_backend}/warehouse`, formData, {})
      .then((res) => {
        modalSuccess.LoadScript();
      })
      .catch((err) => {
        modalFail.LoadScript();
      });
    // modalSuccess.LoadScript();
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
                    <h3 className="card-title">Add New Warehouse</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form>
                    <div className="card-body">
                      {/* Profile  */}
                      <div className="form-group">
                        <label htmlFor="inputProfile">
                          Select Picture <span className="text-danger">*</span>
                        </label>
                        <div className="form-group">
                          <img
                            src={this.state.image}
                            className="img-thumbnail img-input-product"
                            alt="..."
                          />
                          <div className="custom-file mt-2">
                            <input
                              type="file"
                              className={
                                this.state.isProfileValid === ""
                                  ? "custom-file-input"
                                  : this.state.isProfileValid
                                  ? "custom-file-input is-valid"
                                  : "custom-file-input is-invalid"
                              }
                              id="customFile"
                              onChange={this.handleProfile}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Choose file
                            </label>
                            {this.state.isProfileValid ? (
                              ""
                            ) : (
                              <span
                                id="inputProfile-error"
                                className="error invalid-feedback"
                              >
                                Please provide a warehouse picture!
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Province  */}
                      <div className="form-group">
                        <label htmlFor="inputProvince">
                          Province <span className="text-danger">*</span>
                        </label>
                        <select
                          className={
                            this.state.isProvinceValid === ""
                              ? "custom-select"
                              : this.state.isProvinceValid
                              ? "custom-select is-valid"
                              : "custom-select is-invalid"
                          }
                          // value={this.state.id_province}
                          onChange={this.handleProvince}
                        >
                          <option>Select Province</option>
                          {this.state.province.map((province, idx) => {
                            return (
                              <option key={idx} value={province.id_province}>
                                {province.province}
                              </option>
                            );
                          })}
                        </select>
                        {this.state.isProvinceValid ? (
                          ""
                        ) : (
                          <span
                            id="inputCategory-error"
                            className="error invalid-feedback"
                          >
                            Please provide a Province!
                          </span>
                        )}
                      </div>
                      {/* City */}
                      <div className="form-group">
                        <label htmlFor="inputCity">
                          City <span className="text-danger">*</span>
                        </label>
                        <select
                          className={
                            this.state.isCityValid === ""
                              ? "custom-select"
                              : this.state.isCityValid
                              ? "custom-select is-valid"
                              : "custom-select is-invalid"
                          }
                          // value={this.state.id_city}
                          onChange={this.handleCity}
                        >
                          <option>Select City</option>
                          {this.state.city.map((city, idx) => {
                            return (
                              <option key={idx} value={city.id_city}>
                                {city.city}
                              </option>
                            );
                          })}
                        </select>
                        {this.state.isCityValid ? (
                          ""
                        ) : (
                          <span
                            id="inputCity-error"
                            className="error invalid-feedback"
                          >
                            Please provide a City!
                          </span>
                        )}
                      </div>
                      {/* district  */}
                      <div className="form-group">
                        <label htmlFor="inputDistrict">
                          District <span className="text-danger">*</span>
                        </label>
                        <select
                          className={
                            this.state.isDistrictValid === ""
                              ? "custom-select"
                              : this.state.isDistrictValid
                              ? "custom-select is-valid"
                              : "custom-select is-invalid"
                          }
                          // value={this.state.id_city}
                          onChange={this.handleDistrict}
                        >
                          <option>Select District</option>
                          {this.state.district.map((district, idx) => {
                            return (
                              <option
                                key={idx}
                                value={district.id_sub_district}
                              >
                                {district.sub_district}
                              </option>
                            );
                          })}
                        </select>
                        {this.state.isDistrictValid ? (
                          ""
                        ) : (
                          <span
                            id="inputDistrict-error"
                            className="error invalid-feedback"
                          >
                            Please provide a District!
                          </span>
                        )}
                      </div>
                      {/* village */}
                      <div className="form-group">
                        <label htmlFor="inputVillage">
                          Village <span className="text-danger">*</span>
                        </label>
                        <select
                          className={
                            this.state.isVillageValid === ""
                              ? "custom-select"
                              : this.state.isVillageValid
                              ? "custom-select is-valid"
                              : "custom-select is-invalid"
                          }
                          // value={this.state.id_city}
                          onChange={this.handleVillage}
                        >
                          <option>Select Village</option>
                          {this.state.village.map((village, idx) => {
                            return (
                              <option key={idx} value={village.id_village}>
                                {village.village}
                              </option>
                            );
                          })}
                        </select>
                        {this.state.isVillageValid ? (
                          ""
                        ) : (
                          <span
                            id="inputVillage-error"
                            className="error invalid-feedback"
                          >
                            Please provide a Village!
                          </span>
                        )}
                      </div>
                      {/* detail address */}
                      <div className="form-group">
                        <label htmlFor="inputDetailAddress">
                          Detail Address <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={
                            this.state.isDetailAddressValid === ""
                              ? "form-control"
                              : this.state.isDetailAddressValid
                              ? "form-control is-valid"
                              : "form-control is-invalid"
                          }
                          id="inputDetailAddress"
                          placeholder="Enter Detail Address..."
                          value={this.state.detail_address}
                          onBlur={this.handleDetailAddress}
                          onChange={this.handleDetailAddress}
                        />
                        {this.state.isDetailAddressValid ? (
                          ""
                        ) : (
                          <span
                            id="inputDetailAddress-error"
                            className="error invalid-feedback"
                          >
                            Please provide a Detail Address! (character &ge; 5)
                          </span>
                        )}
                      </div>
                      {/* other detail */}
                      <div className="form-group">
                        <label htmlFor="inputOtherDetail">
                          Other Detail <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={
                            this.state.isOtherDetailValid === ""
                              ? "form-control"
                              : this.state.isOtherDetailValid
                              ? "form-control is-valid"
                              : "form-control is-invalid"
                          }
                          id="inputOtherDetail"
                          placeholder="Enter Other Detail Address..."
                          value={this.state.other_detail}
                          onBlur={this.handleOtherDetail}
                          onChange={this.handleOtherDetail}
                        />
                        {this.state.isOtherDetailValid ? (
                          ""
                        ) : (
                          <span
                            id="inputOtherDetail-error"
                            className="error invalid-feedback"
                          >
                            Please provide a Other Detail Address! (character &ge; 5)
                          </span>
                        )}
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.handleSave}
                      >
                        Create Warehouse
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
