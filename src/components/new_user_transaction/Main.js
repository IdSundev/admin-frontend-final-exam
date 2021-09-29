import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import Pagination from "./Pagination";
import { Link } from "react-router-dom"; 

export default class Main extends Component {
  componentDidMount() {
    this.getNewUserTransaction();
    // this.getWarehouse();
  }

  componentDidUpdate(prevProps) {
    if (this.props.page && this.props.page !== prevProps.page) {
      this.getNewUserTransaction();
    //   this.getWarehouse();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      newUserTransaction: [],
    //   warehouse: [],
    //   id_warehouse: 1,
    };
    this.getNewUserTransaction = this.getNewUserTransaction.bind(this);
    // this.getWarehouse = this.getWarehouse.bind(this);
  }

  getNewUserTransaction = () => {
    axios
      .get(
        `${url_backend}/admin/new-transaction?page=${this.props.page}`
      )
      .then((res) => {
        console.log(res)
        console.log(res.data.userTransactionNew)
        this.setState({ newUserTransaction: res.data.userTransactionNew});
        this.setState({ links: res.data.links });
        console.log('state',this.state.newUserTransaction)
      })
      .catch((err) => {
        console.log(err);
      });
  };

//   getWarehouse = () => {
//     axios
//       .get(`${url_backend}/requestsin/warehouse`)
//       .then((res) => {
//         // console.log(res);
//         let data_warehouse = []
//         res.data.map((item) => {
//           return data_warehouse[item.id_warehouse] = item.detail_address
//         })
//         this.setState({ warehouse: data_warehouse})
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

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
                    <table className="table table-striped ">
                      <thead>
                        <tr>
                          <th scope="col">ID Transaction</th>
                          <th scope="col">Full Name</th>
                          <th scope="col">User Address</th>
                          <th scope="col">Warehouse Address</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.newUserTransaction.map((request, idx) => {
                          return (
                            <tr
                              key={idx}
                              className={
                                !request.accepted && !request.reject
                                  ? "table-warning"
                                  : ""
                              }
                            >
                              <td>
                                {request.id_transaction}
                              </td>
                              <td>
                                {request.full_name}
                              </td>
                              <td>
                                {request.user_address}
                              </td>
                              <td>
                                {request.warehouse}
                              </td>
                              <td>
                                {request.status}
                              </td>
                              <td>
                                <button
                                  className={
                                    request.accepted
                                      ? "btn btn-warning btn-sm"
                                      : request.reject
                                      ? "btn btn-secondary btn-sm"
                                      : "btn btn-danger btn-sm"
                                  }
                                >
                                  {request.accepted
                                    ? "Accepted"
                                    : request.reject
                                    ? "Reject"
                                    : "New"}
                                </button>
                              </td>
                              <td>
                                <Link
                                  to={`/admin/new-transaction/detail/${request.id_transaction}`}
                                >
                                  <button className="btn btn-primary btn-sm">
                                    Detail
                                  </button>
                                </Link>
                              </td> 
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
