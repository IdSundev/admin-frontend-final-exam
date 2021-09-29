import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export default class Header extends Component {

  constructor() {
    super();

    this.state = {
      login: false,
      id_warehouse: null
    };
  }

  componentWillMount() {
    let id_warehouse = cookies.get('id_warehouse');

    console.log(id_warehouse)

    if (id_warehouse !== undefined) {
      this.setState({
        login: true,
        id_warehouse: id_warehouse
      })
    }

    console.log('id', this.state.id_warehouse)
  }



  render() {
    return (
      <div>
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <Link to={`/admin/admin/add`}>
                  <button className="btn btn-success mb-2 btn-sm">
                    <i className="fa fa-plus"></i>
                    &nbsp; Create Admin
                  </button>
                </Link>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/admin">Users {this.state.id_warehouse}</a>
                  </li>
                  <li className="breadcrumb-item active">Admin</li>
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
