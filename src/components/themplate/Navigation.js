import React, { Component } from "react";

export default class Navigation extends Component {
  render() {
    return (
      <div>
        <div>
          {/* Preloader */}
          {/* <div className="preloader flex-column justify-content-center align-items-center">
            <img
              className="animation__shake"
              src="dist/img/AdminLTELogo.png"
              alt="AdminLTELogo"
              height={60}
              width={60}
            />
          </div> */}
          {/* Navbar */}
          <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-widget="pushmenu"
                  href="/#"
                  role="button"
                >
                  <i className="fas fa-bars" />
                </a>
              </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
              {/* Messages Dropdown Menu */}
              <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="/#">
                  <i className="far fa-clipboard" />
                  <span className="badge badge-danger navbar-badge">3</span>
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <a href="/#" className="dropdown-item">
                    {/* Message Start */}
                    <div className="media">
                      <img
                        src="dist/img/user1-128x128.jpg"
                        alt="User Avatar"
                        className="img-size-50 mr-3 img-circle"
                      />
                      <div className="media-body">
                        <h3 className="dropdown-item-title">
                          Brad Diesel
                          <span className="float-right text-sm text-danger">
                            <i className="fas fa-star" />
                          </span>
                        </h3>
                        <p className="text-sm">Call me whenever you can...</p>
                        <p className="text-sm text-muted">
                          <i className="far fa-clock mr-1" /> 4 Hours Ago
                        </p>
                      </div>
                    </div>
                    {/* Message End */}
                  </a>
                  <div className="dropdown-divider" />
                  <a href="/#" className="dropdown-item">
                    {/* Message Start */}
                    <div className="media">
                      <img
                        src="dist/img/user8-128x128.jpg"
                        alt="User Avatar"
                        className="img-size-50 img-circle mr-3"
                      />
                      <div className="media-body">
                        <h3 className="dropdown-item-title">
                          John Pierce
                          <span className="float-right text-sm text-muted">
                            <i className="fas fa-star" />
                          </span>
                        </h3>
                        <p className="text-sm">I got your message bro</p>
                        <p className="text-sm text-muted">
                          <i className="far fa-clock mr-1" /> 4 Hours Ago
                        </p>
                      </div>
                    </div>
                    {/* Message End */}
                  </a>
                  <div className="dropdown-divider" />
                  <a href="/#" className="dropdown-item">
                    {/* Message Start */}
                    <div className="media">
                      <img
                        src="dist/img/user3-128x128.jpg"
                        alt="User Avatar"
                        className="img-size-50 img-circle mr-3"
                      />
                      <div className="media-body">
                        <h3 className="dropdown-item-title">
                          Nora Silvester
                          <span className="float-right text-sm text-warning">
                            <i className="fas fa-star" />
                          </span>
                        </h3>
                        <p className="text-sm">The subject goes here</p>
                        <p className="text-sm text-muted">
                          <i className="far fa-clock mr-1" /> 4 Hours Ago
                        </p>
                      </div>
                    </div>
                    {/* Message End */}
                  </a>
                  <div className="dropdown-divider" />
                  <a href="/#" className="dropdown-item dropdown-footer">
                    See All Messages
                  </a>
                </div>
              </li>
              {/* Notifications Dropdown Menu */}
              <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="/#">
                  <i className="far fa-bell" />
                  <span className="badge badge-warning navbar-badge">15</span>
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <span className="dropdown-item dropdown-header">
                    3 Notifications
                  </span>
                  <div className="dropdown-divider" />
                  <a href="/#" className="dropdown-item">
                    <i className="fas fa-caret-square-down mr-2 text-success" /> Request
                    Stock from Warehouse A
                    <span className="float-right text-muted text-sm">
                      3 mins
                    </span>
                  </a>
                  <div className="dropdown-divider" />
                  <a href="/#" className="dropdown-item">
                    <i className="fas fa-caret-square-down mr-2 text-success" /> Request
                    Stock from Warehouse A
                    <span className="float-right text-muted text-sm">
                      3 mins
                    </span>
                  </a>
                  <div className="dropdown-divider" />
                  <a href="/#" className="dropdown-item">
                    <i className="fas fa-caret-square-down mr-2 text-success" /> Request
                    Stock from Warehouse A
                    <span className="float-right text-muted text-sm">
                      3 mins
                    </span>
                  </a>
                  <div className="dropdown-divider" />
                  <a href="/#" className="dropdown-item dropdown-footer">
                    See All Notifications
                  </a>
                </div>
              </li>
              {/* Notifications Dropdown Menu */}
              <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="/#">
                  <i className="fas fa-user" />
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <a href="/#" className="dropdown-item">
                    <i className="fas fa-edit mr-2" />
                    My Profile
                  </a>
                  <div className="dropdown-divider" />
                  <a href="/#" className="dropdown-item">
                    <i className="fas fa-sign-out-alt mr-2" />
                    Logout
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-widget="fullscreen"
                  href="/#"
                  role="button"
                >
                  <i className="fas fa-expand-arrows-alt" />
                </a>
              </li>
            </ul>
          </nav>
          {/* /.navbar */}
        </div>
      </div>
    );
  }
}
