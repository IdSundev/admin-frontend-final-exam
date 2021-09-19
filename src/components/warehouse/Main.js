import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";

export default class Main extends Component {
  componentDidMount() {
    this.getWarehouse();
  }

  componentDidUpdate(prevProps) {
    if (this.props.page && this.props.page !== prevProps.page) {
      this.getWarehouse();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      warehouse: [],
    };
    this.getWarehouse = this.getWarehouse.bind(this);
  }

  getWarehouse = () => {
    axios
      .get(`${url_backend}/warehouse`)
      .then((res) => {
        this.setState({ warehouse: res.data });
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
              <div className="col-md-12">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">LIST DATA</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body" style={{ display: "block" }}>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Image</th>
                          <th scope="col">Warehouse</th>
                          <th scope="col">Detail Address</th>
                          <th scope="col">Other Detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.warehouse.map((request, idx) => {
                          return (
                            <tr key={idx}>
                              <td>
                                <img
                                  src={`${url_backend}/public/img/warehouse/${request.profile}`}
                                  className="admin-img-products"
                                  alt={`${request.id_warehouse}`}
                                />
                              </td>
                              <td>{request.detail_address}</td>
                              <td>
                                {request.village}, {request.sub_district}, <br />
                                {request.city}, {request.province} <br />
                                {request.postal_code}
                              </td>
                              <td>{request.other_detail}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
