import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

export default class Main extends Component {
  componentDidMount() {
    this.getStockin();
    this.getWarehouse();
  }

  componentDidUpdate(prevProps) {
    if (this.props.page && this.props.page !== prevProps.page) {
      this.getStockin();
      this.getWarehouse();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      stockin: [],
      warehouse: [],
      id_warehouse: 1,
    };
    this.getStockin = this.getStockin.bind(this);
    this.getWarehouse = this.getWarehouse.bind(this);
  }

  getStockin = () => {
    axios
      .get(
        `${url_backend}/stockin?page=${this.props.page}&id_warehouse=${this.state.id_warehouse}`
      )
      .then((res) => {
        this.setState({ stockin: res.data.stockin });
        this.setState({ links: res.data.links });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getWarehouse = () => {
    axios
      .get(`${url_backend}/stockin/warehouse`)
      .then((res) => {
        // console.log(res);
        let data_warehouse = [];
        res.data.map((item) => {
          return (data_warehouse[item.id_warehouse] = item.detail_address);
        });
        this.setState({ warehouse: data_warehouse });
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
                    <h3 className="card-title">LIST DATA STOCK GOING IN</h3>
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
                          <th scope="col">Warehouse (From)</th>
                          <th scope="col">Warehouse (To)</th>
                          <th scope="col">Date</th>
                          <th scope="col">Detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.stockin.map((request, idx) => {
                          return (
                            <tr key={idx}>
                              <td>
                                {
                                  this.state.warehouse[
                                    request.id_original_warehouse
                                  ]
                                }
                              </td>
                              <td>
                                {
                                  this.state.warehouse[
                                    request.id_destination_warehouse
                                  ]
                                }
                              </td>
                              <td>{request.date_of_entry}</td>
                              <td>
                                <Link to={`/admin/stockin/detail/${request.id_stock_in}`}>
                                  <button className="btn btn-primary btn-sm">
                                    Detail
                                  </button>
                                </Link>
                              </td>
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
