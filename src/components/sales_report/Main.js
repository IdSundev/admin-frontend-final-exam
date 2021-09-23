import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import Pagination from "./Pagination";
import DetailSales from "./DetailSales";
import Graph from "./Graph";
const currency = require("../../helpers/formatRupiah");

export default class Main extends Component {
  componentDidMount() {
    this.getSales();
  }

  componentDidUpdate(prevProps) {
    if (this.props.page && this.props.page !== prevProps.page) {
      this.getSales();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      id_warehouse: 1,
    };
    this.getSales = this.getSales.bind(this);
  }

  getSales = () => {
    axios
      .get(
        `${url_backend}/sales_report?page=${this.props.page}&id_warehouse=${this.state.id_warehouse}`
      )
      .then((res) => {
        this.setState({ sales: res.data.sales });
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
                <Graph id_warehouse={this.state.id_warehouse} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {this.state.sales.map((sales, idx) => {
                  return (
                    <div className="card" key={idx}>
                      {/* /.card-header */}
                      <div className="card-body" style={{ display: "block" }}>
                        <table>
                          <thead></thead>
                          <tbody>
                            <tr>
                              <td>
                                <b>ID Transaction</b>
                              </td>
                              <td>:&nbsp;{sales.id_transaction}</td>
                              <td>&nbsp;&nbsp;&nbsp;</td>
                              <td>
                                <b>User Address</b>
                              </td>
                              <td>:&nbsp;{sales.user_address}</td>
                            </tr>
                            <tr>
                              <td>
                                <b>Date</b>
                              </td>
                              <td>:&nbsp;{sales.date}</td>
                              <td>&nbsp;&nbsp;&nbsp;</td>
                              <td>
                                <b>Warehouse</b>
                              </td>
                              <td>:&nbsp;{sales.warehouse}</td>
                            </tr>
                            <tr>
                              <td>
                                <b>User Fullname</b>
                              </td>
                              <td>:&nbsp;{sales.full_name}</td>
                              <td>&nbsp;&nbsp;&nbsp;</td>
                              <td>
                                <b>Total</b>
                              </td>
                              <td>:&nbsp;Rp. {currency.FormatRupiah(sales.total)}</td>
                            </tr>
                            <tr>
                              <td>
                                <b>Brought Item</b>
                              </td>
                              <td>:</td>
                            </tr>
                          </tbody>
                        </table>
                        <DetailSales id_transaction={sales.id_transaction} />
                      </div>
                    </div>
                  );
                })}
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
