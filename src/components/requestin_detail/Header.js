import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <div>
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h5>Detail Request</h5>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/admin/requestIN">Request</a>
                  </li>
                  <li className="breadcrumb-item active">Detail</li>
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
    )
  }
}
