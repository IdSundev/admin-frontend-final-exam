import React, { Component } from "react";

export default class AdminHome extends Component {
  render() {
    return (
      <div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 col-sm-6 col-12 mt-2">
                <div className="info-box">
                  <span className="info-box-icon bg-success">
                    <i className="fas fa-wallet" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Total Revenue 2021</span>
                    <span className="info-box-number">Rp. 280.123.345,00</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              <div className="col-md-3 col-sm-6 col-12  mt-2">
                <div className="info-box">
                  <span className="info-box-icon bg-danger">
                    <i className="fas fa-clipboard" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">
                      Total Transactions 2021
                    </span>
                    <span className="info-box-number">11876</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              <div className="col-md-3 col-sm-6 col-12 mt-2">
                <div className="info-box">
                  <span className="info-box-icon bg-warning">
                    <i className="fas fa-users" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Total Users</span>
                    <span className="info-box-number">13648</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              <div className="col-md-3 col-sm-6 col-12 mt-2">
                <div className="info-box">
                  <span className="info-box-icon bg-info">
                    <i className="fas fa-cubes" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Total Products</span>
                    <span className="info-box-number">40</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
            <div className="row">
              <section className="col-lg-8 connectedSortable">
                {/* Line chart */}
                <div className="card card-primary card-outline">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="far fa-chart-bar" />
                      &nbsp;Sales Graph
                    </h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="line-chart" style={{ height: 300 }} />
                  </div>
                  {/* /.card-body*/}
                </div>
                {/* /.card */}

                <div className="card card-warning">
                  <div className="card-header border-transparent">
                    <h3 className="card-title">Latest Transactions</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table m-0">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Item</th>
                            <th>Status</th>
                            <th>Popularity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <a href="pages/examples/invoice.html">OR9842</a>
                            </td>
                            <td>Call of Duty IV</td>
                            <td>
                              <span className="badge badge-success">
                                Shipped
                              </span>
                            </td>
                            <td>
                              <div
                                className="sparkbar"
                                data-color="#00a65a"
                                data-height={20}
                              >
                                90,80,90,-70,61,-83,63
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="pages/examples/invoice.html">OR1848</a>
                            </td>
                            <td>Samsung Smart TV</td>
                            <td>
                              <span className="badge badge-warning">
                                Pending
                              </span>
                            </td>
                            <td>
                              <div
                                className="sparkbar"
                                data-color="#f39c12"
                                data-height={20}
                              >
                                90,80,-90,70,61,-83,68
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="pages/examples/invoice.html">OR7429</a>
                            </td>
                            <td>iPhone 6 Plus</td>
                            <td>
                              <span className="badge badge-danger">
                                Delivered
                              </span>
                            </td>
                            <td>
                              <div
                                className="sparkbar"
                                data-color="#f56954"
                                data-height={20}
                              >
                                90,-80,90,70,-61,83,63
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="pages/examples/invoice.html">OR7429</a>
                            </td>
                            <td>Samsung Smart TV</td>
                            <td>
                              <span className="badge badge-info">
                                Processing
                              </span>
                            </td>
                            <td>
                              <div
                                className="sparkbar"
                                data-color="#00c0ef"
                                data-height={20}
                              >
                                90,80,-90,70,-61,83,63
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="pages/examples/invoice.html">OR1848</a>
                            </td>
                            <td>Samsung Smart TV</td>
                            <td>
                              <span className="badge badge-warning">
                                Pending
                              </span>
                            </td>
                            <td>
                              <div
                                className="sparkbar"
                                data-color="#f39c12"
                                data-height={20}
                              >
                                90,80,-90,70,61,-83,68
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="pages/examples/invoice.html">OR7429</a>
                            </td>
                            <td>iPhone 6 Plus</td>
                            <td>
                              <span className="badge badge-danger">
                                Delivered
                              </span>
                            </td>
                            <td>
                              <div
                                className="sparkbar"
                                data-color="#f56954"
                                data-height={20}
                              >
                                90,-80,90,70,-61,83,63
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <a href="pages/examples/invoice.html">OR9842</a>
                            </td>
                            <td>Call of Duty IV</td>
                            <td>
                              <span className="badge badge-success">
                                Shipped
                              </span>
                            </td>
                            <td>
                              <div
                                className="sparkbar"
                                data-color="#00a65a"
                                data-height={20}
                              >
                                90,80,90,-70,61,-83,63
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* /.table-responsive */}
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer clearfix">
                    <a
                      href="/#"
                      className="btn btn-sm btn-secondary float-right"
                    >
                      View All Orders
                    </a>
                  </div>
                  {/* /.card-footer */}
                </div>
              </section>
              <section className="col-lg-4 connectedSortable">
                {/* USERS LIST */}
                <div className="card card-danger">
                  <div className="card-header">
                    <h3 className="card-title">Latest Members</h3>
                    <div className="card-tools">
                      <span className="badge badge-warning">8 New Members</span>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body p-0">
                    <ul className="users-list clearfix">
                      <li>
                        <img
                          src="dist/img/user1-128x128.jpg"
                          alt="User Image1"
                        />
                        <a className="users-list-name" href="/#">
                          Alexander Pierce
                        </a>
                        <span className="users-list-date">Today</span>
                      </li>
                      <li>
                        <img
                          src="dist/img/user8-128x128.jpg"
                          alt="User Image2"
                        />
                        <a className="users-list-name" href="/#">
                          Norman
                        </a>
                        <span className="users-list-date">Yesterday</span>
                      </li>
                      <li>
                        <img
                          src="dist/img/user7-128x128.jpg"
                          alt="User Image3"
                        />
                        <a className="users-list-name" href="/#">
                          Jane
                        </a>
                        <span className="users-list-date">12 Jan</span>
                      </li>
                      <li>
                        <img
                          src="dist/img/user6-128x128.jpg"
                          alt="User Image4"
                        />
                        <a className="users-list-name" href="/#">
                          John
                        </a>
                        <span className="users-list-date">12 Jan</span>
                      </li>
                      <li>
                        <img
                          src="dist/img/user2-160x160.jpg"
                          alt="User Image5"
                        />
                        <a className="users-list-name" href="/#">
                          Alexander
                        </a>
                        <span className="users-list-date">13 Jan</span>
                      </li>
                      <li>
                        <img
                          src="dist/img/user5-128x128.jpg"
                          alt="User Image6"
                        />
                        <a className="users-list-name" href="/#">
                          Sarah
                        </a>
                        <span className="users-list-date">14 Jan</span>
                      </li>
                      <li>
                        <img
                          src="dist/img/user4-128x128.jpg"
                          alt="User Image7"
                        />
                        <a className="users-list-name" href="/#">
                          Nora
                        </a>
                        <span className="users-list-date">15 Jan</span>
                      </li>
                      <li>
                        <img
                          src="dist/img/user3-128x128.jpg"
                          alt="User Image8"
                        />
                        <a className="users-list-name" href="/#">
                          Nadia
                        </a>
                        <span className="users-list-date">15 Jan</span>
                      </li>
                    </ul>
                    {/* /.users-list */}
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer text-center">
                    <a href="/#">View All Users</a>
                  </div>
                  {/* /.card-footer */}
                </div>
                {/*/.card */}
                <div className="card  card-success card-outline">
                  <div className="card-header">
                    <h3 className="card-title">Recently Added Products</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body p-0">
                    <ul className="products-list product-list-in-card pl-2 pr-2">
                      <li className="item">
                        <div className="product-img">
                          <img
                            src="dist/img/default-150x150.png"
                            alt="Product Image1"
                            className="img-size-50"
                          />
                        </div>
                        <div className="product-info">
                          <a
                            href="/#"
                            className="product-title"
                          >
                            Samsung TV
                            <span className="badge badge-warning float-right">
                              $1800
                            </span>
                          </a>
                          <span className="product-description">
                            Samsung 32" 1080p 60Hz LED Smart HDTV.
                          </span>
                        </div>
                      </li>
                      {/* /.item */}
                      <li className="item">
                        <div className="product-img">
                          <img
                            src="dist/img/default-150x150.png"
                            alt="Product Image2"
                            className="img-size-50"
                          />
                        </div>
                        <div className="product-info">
                          <a
                            href="/#"
                            className="product-title"
                          >
                            Bicycle
                            <span className="badge badge-info float-right">
                              $700
                            </span>
                          </a>
                          <span className="product-description">
                            26" Mongoose Dolomite Men's 7-speed, Navy Blue.
                          </span>
                        </div>
                      </li>
                      {/* /.item */}
                      <li className="item">
                        <div className="product-img">
                          <img
                            src="dist/img/default-150x150.png"
                            alt="Product Image3"
                            className="img-size-50"
                          />
                        </div>
                        <div className="product-info">
                          <a
                            href="/#"
                            className="product-title"
                          >
                            Xbox One{" "}
                            <span className="badge badge-danger float-right">
                              $350
                            </span>
                          </a>
                          <span className="product-description">
                            Xbox One Console Bundle with Halo Master Chief
                            Collection.
                          </span>
                        </div>
                      </li>
                      {/* /.item */}
                      <li className="item">
                        <div className="product-img">
                          <img
                            src="dist/img/default-150x150.png"
                            alt="Product Image5"
                            className="img-size-50"
                          />
                        </div>
                        <div className="product-info">
                          <a
                            href="/#"
                            className="product-title"
                          >
                            PlayStation 4
                            <span className="badge badge-success float-right">
                              $399
                            </span>
                          </a>
                          <span className="product-description">
                            PlayStation 4 500GB Console (PS4)
                          </span>
                        </div>
                      </li>
                      {/* /.item */}
                    </ul>
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer text-center">
                    <a href="/#" className="uppercase">
                      View All Products
                    </a>
                  </div>
                  {/* /.card-footer */}
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
