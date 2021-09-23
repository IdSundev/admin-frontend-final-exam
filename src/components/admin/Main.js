import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import Pagination from "./Pagination";
// import { Link } from "react-router-dom";

export default class Main extends Component {
  componentDidMount() {
    this.getAdmin();
  }

  componentDidUpdate(prevProps) {
    if (this.props.page && this.props.page !== prevProps.page) {
      this.getAdmin();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      admin: [],
    };
    this.getAdmin = this.getAdmin.bind(this);
  }

  getAdmin = () => {
    axios
      .get(`${url_backend}/admin?page=${this.props.page}`)
      .then((res) => {
        this.setState({ admin: res.data.admin });
        this.setState({ links: res.data.links });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (!this.state.links) return null;
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
                    {/* /.card-tools */}
                  </div>
                  {/* /.card-header */}
                  <div className="card-body" style={{ display: "block" }}>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Full Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Contact</th>
                          <th scope="col">Warehouse</th>
                          <th scope="col">Gender</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.admin.map((request, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{request.full_name}</td>
                              <td>{request.email}</td>
                              <td>{request.contact}</td>
                              <td>{request.detail_address}</td>
                              <td>{request.gender}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Pagination
                  links={this.state.links}
                  pageSelected={this.props.page}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
