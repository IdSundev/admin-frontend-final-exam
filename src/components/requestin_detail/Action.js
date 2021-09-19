import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import ModalSuccess from "../modal/requestin/ModalAcceptedSuccess";
import ModalReject from "../modal/requestin/ModalReject";

const modalSuccess = require("../../helpers/modalSuccess");
const modalReject = require("../../helpers/modalReject");

export default class Action extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason_for_reject: "",
    };
  }

  handleReasonReject = (event) => {
    const { value } = event.target;
    this.setState({ reason_for_reject: value });
  };

  handleAccepted = (id_request) => {
    axios
      .post(`${url_backend}/requestin/accepted`, {
        id_request: id_request
      })
      .then((res) => {
        modalSuccess.LoadScript();
      })
      .catch((err) => {
        console.log(err)
      });
  };

  handleRejected = (id_request) => {
    axios
      .post(`${url_backend}/requestin/reject`, {
        id_request: id_request,
        reason_for_reject: this.state.reason_for_reject
      })
      .then((res) => {
        modalReject.LoadScript();
      })
      .catch((err) => {
        console.log(err)
      });
    modalReject.LoadScript();
    // console.log(this.state.reason_for_reject)
    // console.log(id_request)
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-outline card-warning">
              <div className="card-header">
                <h3 className="card-title">Actions</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                  >
                    <i className="fas fa-minus" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => {this.handleAccepted(this.props.id_request)}}
                  >
                    Accepted
                  </button>
                </div>
                <div className="form-group">
                  <label htmlFor="inputReject">Or Reject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputReject"
                    placeholder="Enter reason for reject"
                    value={this.state.reason_for_reject}
                    onBlur={this.handleReasonReject}
                    onChange={this.handleReasonReject}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary mt-2"
                    onClick={() => {this.handleRejected(this.props.id_request)}}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalSuccess message={"Request has Accepted!"} id_request={this.props.id_request} setStateAccepted={this.props.setStateAccepted} />
        <ModalReject message={"Request has Rejected!"} id_request={this.props.id_request} setStateReject={this.props.setStateReject} />
      </div>
    );
  }
}
