import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div>
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <Link to={`/admin/warehouse/add`}>
                  <button className="btn btn-success mb-2 btn-sm">
                    <i className="fa fa-plus"></i>
                    &nbsp; Create Warehouse
                  </button>
                </Link>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/warehouse">Warehouse</a>
                  </li>
                  <li className="breadcrumb-item active">Warehouse</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
      </div>
    );
  }
}
