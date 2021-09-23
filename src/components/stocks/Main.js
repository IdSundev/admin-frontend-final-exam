import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import Pagination from "./Pagination";

export default class Main extends Component {
  componentDidMount() {
    this.getStocks();
  }

  componentDidUpdate(prevProps) {
    if (this.props.page && this.props.page !== prevProps.page) {
      this.getStocks();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      id_warehouse: 1,
    };
    this.getStocks = this.getStocks.bind(this);
  }

  getStocks = () => {
    axios
      .get(
        `${url_backend}/stocks?page=${this.props.page}&id_warehouse=${this.state.id_warehouse}`
      )
      .then((res) => {
        this.setState({ stocks: res.data.stocks });
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
                  {/* /.card-header */}
                  <div className="card-body" style={{ display: "block" }}>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col">Available</th>
                          <th scope="col">Non Available</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.stocks.map((stock, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{stock.name}</td>
                              <td>{stock.available}</td>
                              <td>{stock.non_available}</td>
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
