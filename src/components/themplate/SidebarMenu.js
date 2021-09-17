import React, { Component } from "react";
import { url } from "../../config/url";
import { Link } from "react-router-dom";

export default class SidebarMenu extends Component {

  componentDidMount(){
    this.getPage();
  }

  constructor(props) {
    super(props);
    this.state = {
      page:''
    };
    // this.getPage = this.getPage.bind(this);
  }

  getPage = () => {
    this.setState({ page: window.location.pathname.split("/")[2] })
  }

  render() {
    return (
      <div>
        {/* Main Sidebar Container */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="index3.html" className="brand-link">
            <img
              src={`${url}/dist/img/AdminLTELogo.png`}
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">
              W A R E H O U S E
            </span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src={`${url}/dist/img/user2-160x160.jpg`}
                  className="img-circle elevation-2"
                  alt="User Image2"
                />
              </div>
              <div className="info">
                <a href="/#" className="d-block">
                  Alexander Pierce
                </a>
              </div>
            </div>
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                <li className="nav-item" onClick={this.getPage}>
                  <Link to="/admin/home" className={this.state.page === "home" ? "nav-link active" : "nav-link"}>
                    <i className="nav-icon fas fa-home" />
                    <p>HOME</p>
                  </Link>
                </li>
                <li className="nav-header">Master Data</li>
                <li className="nav-item menu-open" onClick={this.getPage}>
                  <a href="/#" className={this.state.page === "users" || this.state.page === "superadmin" || this.state.page === "admin" ? "nav-link active" : "nav-link"}>
                    <i className="nav-icon fas fa-users" />
                    <p>
                      Users
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/admin/users" onClick={this.getPage} className={this.state.page === "users" ? "nav-link active" : "nav-link"}>
                        <i className="far fa-circle nav-icon" />
                        <p>Users</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/admin" onClick={this.getPage} className={this.state.page === "admin" ? "nav-link active" : "nav-link"}>
                        <i className="far fa-circle nav-icon" />
                        <p>Admin</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/superadmin" onClick={this.getPage} className={this.state.page === "superadmin" ? "nav-link active" : "nav-link"}>
                        <i className="far fa-circle nav-icon" />
                        <p>Super Admin</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item" onClick={this.getPage}>
                  <a href="/#" className={this.state.page === "products" || this.state.page === "stocks" ? "nav-link active" : "nav-link"}>
                    <i className="nav-icon fas fa-cubes" />
                    <p>
                      Products
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/admin/products" onClick={this.getPage} className={this.state.page === "products" ? "nav-link active" : "nav-link"}>
                        <i className="far fa-circle nav-icon" />
                        <p>Products</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/stocks" onClick={this.getPage} className={this.state.page === "stocks" ? "nav-link active" : "nav-link"}>
                        <i className="far fa-circle nav-icon" />
                        <p>Stock Operasional</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-header">WAREHOUSE</li>
                <li className="nav-item" onClick={this.getPage}>
                  <a href="/#" className={this.state.page === "new-transaction" || this.state.page === "transactions" ? "nav-link active" : "nav-link"}>
                    <i className="nav-icon fas fa-clipboard" />
                    <p>
                      Transactions
                      <i className="right fas fa-angle-left" />
                      <span className="badge badge-danger right">New</span>
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/admin/new-transaction" onClick={this.getPage} className={this.state.page === "new-transaction" ? "nav-link active" : "nav-link"}>
                        <i className="far fa-circle nav-icon text-danger" />
                        <p>
                          New
                          <span className="right badge badge-danger">6</span>
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/transactions" onClick={this.getPage} className={this.state.page === "transactions" ? "nav-link active" : "nav-link"}>
                        <i className="far fa-circle nav-icon" />
                        <p>All Transactions</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item" onClick={this.getPage}>
                  <a href="/#" className={this.state.page === "warehouse" || this.state.page === "requests" || this.state.page === "stockin" || this.state.page === "stockout" || this.state.page === "sales-report" ? "nav-link active" : "nav-link"}>
                    <i className="nav-icon fas fa-warehouse" />
                    <p>
                      Warehouse
                      <i className="right fas fa-angle-left" />
                      <span className="badge badge-warning right">New</span>
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to="/admin/warehouse" onClick={this.getPage} className={this.state.page === "warehouse" ? "nav-link active" : "nav-link"}>
                        <i className="far fa-circle nav-icon" />
                        <p>Warehouse</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/requests" onClick={this.getPage} className={this.state.page === "requests" ? "nav-link active" : "nav-link"}>
                        <i className="far fa-circle nav-icon text-warning" />
                        <p>
                          Request
                          <span className="right badge badge-warning">6</span>
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/stockin" onClick={this.getPage} className={this.state.page === "stockin" ? "nav-link active" : "nav-link"}>
                        <i className="far fa-circle nav-icon" />
                        <p>Stock In</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/stockout" className={this.state.page === "stockout" ? "nav-link active" : "nav-link"}>
                        <i className="far fa-circle nav-icon" />
                        <p>Stock Out</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/admin/sales-report" onClick={this.getPage} className={this.state.page === "sales-report" ? "nav-link active" : "nav-link"}>
                        <i className="far fa-circle nav-icon" />
                        <p>Sales Report</p>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    );
  }
}
