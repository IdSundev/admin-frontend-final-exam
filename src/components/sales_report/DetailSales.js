import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
const currency = require("../../helpers/formatRupiah");

export default class DetailSales extends Component {
  componentDidMount() {
    this.getSalesDetail(this.props.id_transaction);
  }

  constructor(props) {
    super(props);
    this.state = {
      sales: [],
    };
    this.getSalesDetail = this.getSalesDetail.bind(this);
  }

  getSalesDetail = (id_transaction) => {
    axios
      .get(`${url_backend}/sales_report/detail/${id_transaction}`)
      .then((res) => {
        this.setState({
          sales: res.data.request,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <table className="table table-striped table-sm mt-2">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {this.state.sales.map((sales, idx) => {
              return (
                <tr key={idx}>
                  <td>{sales.name}</td>
                  <td>Rp. {currency.FormatRupiah(sales.price)}</td>
                  <td>{sales.quantity}</td>
                  <td>Rp. {currency.FormatRupiah(sales.total)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
