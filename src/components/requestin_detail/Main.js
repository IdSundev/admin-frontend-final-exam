import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import "../../assets/css/style.css";
import Action from "./Action";

export default class Main extends Component {
  componentDidMount() {
    this.getRequestinDetail(this.props.id_request);
    this.getRequestin(this.props.id_request);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.accepted !== prevState.accepted) {
      this.getRequestinDetail(this.props.id_request);
      this.getRequestin(this.props.id_request);
    }
    if (this.state.reject !== prevState.reject) {
      this.getRequestinDetail(this.props.id_request);
      this.getRequestin(this.props.id_request);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      requestsin: [],
      id_request: "",
      original_warehouse: "",
      destination_warehouse: "",
      request_date: "",
      accepted: "",
      reject: "",
      reason_for_reject: "",
    };
    this.getRequestinDetail = this.getRequestinDetail.bind(this);
    this.getRequestin = this.getRequestin.bind(this);
    this.setStateAccepted = this.setStateAccepted.bind(this);
    this.setStateReject = this.setStateReject.bind(this);
  }

  getRequestinDetail = (id_request) => {
    axios
      .get(`${url_backend}/request_detail?request=${id_request}`)
      .then((res) => {
        this.setState({
          requestsin: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getRequestin = (id_request) => {
    axios
      .get(`${url_backend}/requestsin/detail/${id_request}`)
      .then((res) => {
        this.setState({
          id_request: res.data.request[0].id_request,
          original_warehouse: res.data.request[0].original_warehouse,
          destination_warehouse: res.data.request[0].destination_warehouse,
          request_date: res.data.request[0].request_date,
          accepted: res.data.request[0].accepted,
          reject: res.data.request[0].reject,
          reason_for_reject: res.data.request[0].reason_for_reject,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setStateAccepted = () =>{
    this.setState({accepted : true})
  }

  setStateReject = () =>{
    this.setState({reject : true})
  }

  render() {
    let action;
    if(this.state.accepted === null && this.state.reject === null){
      action = <Action id_request={this.state.id_request} setStateAccepted={this.setStateAccepted} setStateReject={this.setStateReject} />
    }
    return (
      <div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">LIST DATA</h3>
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
                  <div className="card-body" style={{ display: "block" }}>
                    <table>
                      <thead></thead>
                      <tbody>
                        <tr>
                          <td>
                            <b>ID Request</b>
                          </td>
                          <td>
                            <span className="mr-4">:</span>{" "}
                            {this.state.id_request}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Warehouse (From)</b>
                          </td>
                          <td>
                            <span className="mr-4">:</span>{" "}
                            {this.state.original_warehouse}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Warehouse (To)</b>
                          </td>
                          <td>
                            <span className="mr-4">:</span>{" "}
                            {this.state.destination_warehouse}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Date</b>
                          </td>
                          <td>
                            <span className="mr-4">:</span>{" "}
                            {this.state.request_date}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Status</b>
                          </td>
                          <td>
                            <span className="mr-4">:</span>
                            <button
                              className={
                                this.state.accepted
                                  ? "btn btn-warning btn-sm mr-2"
                                  : this.state.reject
                                  ? "btn btn-secondary btn-sm mr-2"
                                  : "btn btn-danger btn-sm mr-2"
                              }
                            >
                              {this.state.accepted
                                ? "Accepted"
                                : this.state.reject
                                ? "Reject"
                                : "New"}
                            </button>
                            <i>
                              {this.state.reason_for_reject !== null
                                ? `(${this.state.reason_for_reject})*`
                                : ""}
                            </i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table table-striped table-sm mt-2">
                      <thead>
                        <tr>
                          <th scope="col">ID Product</th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.requestsin.map((request, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{request.id_product}</td>
                              <td>{request.name}</td>
                              <td>{request.quantity}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Acction */}
            {action}
          </div>
        </section>
      </div>
    );
  }
}
