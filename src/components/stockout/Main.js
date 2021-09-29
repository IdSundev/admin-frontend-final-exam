import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export default class Main extends Component {
  componentDidMount() {
    this.getStockout();
    this.getWarehouse();
    this.getUsers();
  }

  componentDidUpdate(prevProps) {
    if (this.props.page && this.props.page !== prevProps.page) {
      this.getStockout();
      this.getWarehouse();
      this.getUsers();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      stockout: [],
      warehouse: [],
      users: [],
      id_warehouse: cookies.get('id_warehouse'),
    };
    this.getStockout = this.getStockout.bind(this);
    this.getWarehouse = this.getWarehouse.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  getStockout = () => {
    axios
      .get(
        `${url_backend}/stockout?page=${this.props.page}&id_warehouse=${this.state.id_warehouse}`
      )
      .then((res) => {
        this.setState({ stockout: res.data.stockout });
        this.setState({ links: res.data.links });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getWarehouse = () => {
    axios
      .get(`${url_backend}/stockout/warehouse`)
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

  getUsers = () => {
    axios
      .get(`${url_backend}/stockout/users`)
      .then((res) => {
        // console.log(res);
        let data_users = [];
        res.data.map((item) => {
          return (data_users[item.id_user] = item.full_name);
        });
        this.setState({ users: data_users });
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
                  
                  {/* /.card-header */}
                  <div className="card-body" style={{ display: "block" }}>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Warehouse (From)</th>
                          <th scope="col">To</th>
                          <th scope="col">Date</th>
                          <th scope="col">Detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.stockout.map((request, idx) => {
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
                                {request.id_user
                                  ? `${
                                      this.state.users[request.id_user]
                                    } (User)`
                                  : `${
                                      this.state.warehouse[
                                        request.id_destination_warehouse
                                      ]
                                    } (Warehouse)`}
                              </td>
                              <td>{request.item_out_date}</td>
                              <td>
                                <Link to={`/admin/stockout/detail/${request.id_stock_out}`}>
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
