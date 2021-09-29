import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import Cookies from 'universal-cookie'
const cookies = new Cookies()
const currency = require("../../helpers/formatRupiah");

export default class Main extends Component {
  componentDidMount() {
    this.getAllRevenue(this.state.id_warehouse);
    this.getAllYear(this.state.id_warehouse);
  }
  constructor(props) {
    super(props);
    this.state = {
      revenue: 0,
      id_warehouse: cookies.get('id_warehouse'),
      year: [],
      // fm => filter month
      fm_year: new Date().getFullYear(),
      fm_month: new Date().getMonth(),
    };
    this.getAllRevenue = this.getAllRevenue.bind(this);
    this.getAllYear = this.getAllYear.bind(this);
    this.handleFilterYear = this.handleFilterYear.bind(this);
    this.handleFilterMonthYear = this.handleFilterMonthYear.bind(this);
    this.handleFilterMonthMonth = this.handleFilterMonthMonth.bind(this);
  }

  getAllRevenue = (id_warehouse) => {
    axios
      .get(`${url_backend}/revenue/all?warehouse=${id_warehouse}`)
      .then((res) => {
        this.setState({ revenue: res.data[0].total });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getAllYear = (id_warehouse) => {
    axios
      .get(`${url_backend}/revenue/list-year?warehouse=${id_warehouse}`)
      .then((res) => {
        this.setState({ year: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFilterYear = (event) => {
    let year = event.target.value;
    axios
      .get(
        `${url_backend}/revenue/year?warehouse=${this.state.id_warehouse}&year=${year}`
      )
      .then((res) => {
        this.setState({ revenue: res.data[0].total });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFilterMonthYear = (event) => {
    this.setState({ fm_year: event.target.value });
  };

  handleFilterMonthMonth = (event) => {
    this.setState({ fm_month: event.target.value });
  };

  handleFilterMonth = () => {
    axios
      .get(
        `${url_backend}/revenue/month?warehouse=${this.state.id_warehouse}&year=${this.state.fm_year}&month=${this.state.fm_month}`
      )
      .then((res) => {
        this.setState({ revenue: res.data[0].total });
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
              <div className="col-md-6">
                {/* general form elements */}
                <div className="card card-success mt-2">
                  <div className="card-header">
                    <h3 className="card-title">Get Revenue</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="inputUsername">
                          All Revenue <span className="text-danger">:</span>
                        </label>
                        <br />
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => {
                            this.getAllRevenue(this.state.id_warehouse);
                          }}
                        >
                          Get All Revenue
                        </button>
                      </div>
                      {/* Filter by Year  */}
                      <div className="form-group">
                        <label htmlFor="inputWarehouse">
                          Filter by Year <span className="text-danger">:</span>
                        </label>
                        <select
                          className="custom-select"
                          onChange={this.handleFilterYear}
                        >
                          {this.state.year.map((year, idx) => {
                            return (
                              <option key={idx} value={year.year}>
                                {year.year}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      {/* Filter by Mont and Year  */}
                      <div className="form-group">
                        <label htmlFor="inputMonth">
                          Filter by Year and Month
                          <span className="text-danger">:</span>
                        </label>
                        <div className="form-inline">
                          <div className="form-group mr-2">
                            <select
                              className="custom-select"
                              onChange={this.handleFilterMonthYear}
                            >
                              {this.state.year.map((year, idx) => {
                                return (
                                  <option key={idx} value={year.year}>
                                    {year.year}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="form-group mr-2">
                            <select
                              className="custom-select"
                              onChange={this.handleFilterMonthMonth}
                            >
                              <option value="01">January</option>
                              <option value="02">February</option>
                              <option value="03">Mart</option>
                              <option value="04">April</option>
                              <option value="05">May</option>
                              <option value="06">June</option>
                              <option value="07">Jully</option>
                              <option value="08">August</option>
                              <option value="09">September</option>
                              <option value="10">October</option>
                              <option value="11">November</option>
                              <option value="12">December</option>
                            </select>
                          </div>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                              this.handleFilterMonth();
                            }}
                          >
                            Apply Filter
                          </button>
                        </div>
                      </div>
                      {/* Revenue */}
                      <div className="form-group">
                        <label htmlFor="inputRevenue">
                          Revenue <span className="text-danger">:</span>
                        </label>
                        <br />
                        <h2>Rp. {currency.FormatRupiah(this.state.revenue)}</h2>
                      </div>
                    </div>
                    {/* /.card-body */}
                  </form>
                </div>
                {/* /.card */}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
