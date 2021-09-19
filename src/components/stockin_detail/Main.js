import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import "../../assets/css/style.css";

export default class Main extends Component {
  componentDidMount() {
    this.getStockinDetail(this.props.id_stock_in);
    this.getStockin(this.props.id_stock_in);
  }

  constructor(props) {
    super(props);
    this.state = {
      stocksin: [],
      id_stock_in: "",
      original_warehouse: "",
      destination_warehouse: "",
      date_of_entry: "",
    };
    this.getStockinDetail = this.getStockinDetail.bind(this);
    this.getStockin = this.getStockin.bind(this);
  }

  getStockinDetail = (id_stock_in) => {
    axios
      .get(`${url_backend}/stockin_detail?stockin=${id_stock_in}`)
      .then((res) => {
        this.setState({
          stocksin: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getStockin = (id_stock_in) => {
    axios
      .get(`${url_backend}/stockin/detail/${id_stock_in}`)
      .then((res) => {
        this.setState({
          id_stock_in: res.data.request[0].id_stock_in,
          original_warehouse: res.data.request[0].original_warehouse,
          destination_warehouse: res.data.request[0].destination_warehouse,
          date_of_entry: res.data.request[0].date_of_entry,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
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
                            {this.state.id_stock_in}
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
                            {this.state.date_of_entry}
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
                        {this.state.stocksin.map((request, idx) => {
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
