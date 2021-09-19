import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import "../../assets/css/style.css";

export default class Main extends Component {
  componentDidMount() {
    this.getStockoutDetail(this.props.id_stock_out);
    this.getStockout(this.props.id_stock_out);
  }

  constructor(props) {
    super(props);
    this.state = {
      stocksout: [],
      id_stock_out: "",
      original_warehouse: "",
      destination_warehouse: "",
      date: "",
      destination_user: "",
    };
    this.getStockoutDetail = this.getStockoutDetail.bind(this);
    this.getStockout = this.getStockout.bind(this);
  }

  getStockoutDetail = (id_stock_out) => {
    axios
      .get(`${url_backend}/stockout_detail?stockout=${id_stock_out}`)
      .then((res) => {
        this.setState({
          stocksout: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getStockout = (id_stock_out) => {
    axios
      .get(`${url_backend}/stockout/detail/${id_stock_out}`)
      .then((res) => {
        this.setState({
          id_stock_out: res.data.request[0].id_stock_out,
          original_warehouse: res.data.request[0].original_warehouse,
          destination_warehouse: res.data.request[0].destination_warehouse,
          date: res.data.request[0].date,
          destination_user: res.data.request[0].destination_user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let to;
    if (this.state.destination_warehouse === null) {
      to = this.state.destination_user;
    } else {
      to = this.state.destination_warehouse;
    }
    return (
      <div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">DATA</h3>
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
                            <b>ID Stock In</b>
                          </td>
                          <td>
                            <span className="mr-4">:</span>{" "}
                            {this.state.id_stock_out}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>From (Warehouse)</b>
                          </td>
                          <td>
                            <span className="mr-4">:</span>{" "}
                            {this.state.original_warehouse}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>To</b>
                          </td>
                          <td>
                            <span className="mr-4">:</span>{" "}
                            {to}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Date</b>
                          </td>
                          <td>
                            <span className="mr-4">:</span> {this.state.date}
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
                        {this.state.stocksout.map((request, idx) => {
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
          </div>
        </section>
      </div>
    );
  }
}
