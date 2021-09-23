import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import ModalFailed from "../modal/requests/ModalFailed";
import ModalSuccess from "../modal/requests/ModalSuccess";
var turf = require("@turf/turf");
const modalFail = require("../../helpers/modalFailed");
const modalSuccess = require("../../helpers/modalSuccess");

export default class Add extends Component {
  componentDidMount() {
    this.getOriginalWarehouse(this.state.id_original_warehouse);
    this.getOtherWarehouse(this.state.id_original_warehouse);
    this.getProducts();
  }

  constructor(props) {
    super(props);
    this.state = {
      id_original_warehouse: 1,
      lon: "",
      lat: "",
      name: "",
      id_product: "",
      isProductValid: "",
      products: [],
      warehouse: [],
      quantity: "",
      isQuantityValid: "",
      products_selected: [],
    };
    this.getOtherWarehouse = this.getOtherWarehouse.bind(this);
    this.getOriginalWarehouse = this.getOriginalWarehouse.bind(this);
    this.handleIdProduct = this.handleIdProduct.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.getClosestsWarehouse = this.getClosestsWarehouse.bind(this);
  }

  getOriginalWarehouse = (id_warehouse) => {
    axios
      .get(`${url_backend}/requests/select/${id_warehouse}`)
      .then((res) => {
        this.setState({
          name: res.data[0].detail_address,
          lon: res.data[0].lon,
          lat: res.data[0].lat,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleIdProduct = (event) => {
    const { value } = event.target;
    this.setState({ id_product: event.target.value });
    value !== "Select Product"
      ? this.setState({
          isProductValid: true,
          id_product: value,
        })
      : this.setState({
          isProductValid: false,
          id_product: "",
        });
  };

  handleQuantity = (event) => {
    const { value } = event.target;
    this.setState({ quantity: value });
    this.state.quantity > 0
      ? this.setState({ isQuantityValid: true })
      : this.setState({ isQuantityValid: false });
  };

  handleAddProduct = () => {
    let data;
    data = this.state.products_selected;
    data.push({
      id_product: this.state.id_product,
      name: this.state.products.find(
        (x) => x.id_product === parseInt(this.state.id_product)
      ).name,
      quantity: this.state.quantity,
    });
    this.setState({
      products_selected: data,
      id_product: "",
      quantity: "",
    });
  };

  getProducts = () => {
    axios
      .get(`${url_backend}/products/all`)
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getOtherWarehouse = (id_warehouse) => {
    axios
      .get(`${url_backend}/requests/other/${id_warehouse}`)
      .then((res) => {
        this.setState({ warehouse: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getClosestsWarehouse = () => {
    let options = { units: "kilometers" };
    let closestwarehouse = 0;
    let id_warehouse;
    // 0.690
    this.state.warehouse.map((warehouse) => {
      let from = turf.point([this.state.lon, this.state.lat]);
      let to = turf.point([warehouse.lon, warehouse.lat]);
      let distance = turf.distance(from, to, options);
      if (closestwarehouse === 0) {
        closestwarehouse = distance;
      } else if (distance < closestwarehouse) {
        closestwarehouse = distance;
        id_warehouse = warehouse.id_warehouse;
      }
    });
    return id_warehouse;
  };

  handleSave = () => {
    let id_destination_warehouse = this.getClosestsWarehouse();
    if (this.state.products_selected.length === 0) {
      modalFail.LoadScript();
      return;
    }

    axios
      .post(`${url_backend}/requests`, {
        id_original_warehouse: this.state.id_original_warehouse,
        id_destination_warehouse: id_destination_warehouse,
      })
      .then((res) => {
        this.state.products_selected.map((product) => {
          axios
            .post(`${url_backend}/request_detail`, {
              id_request: res.data.id_request,
              id_product: product.id_product,
              quantity: product.quantity,
            })
        });
      })
      .then(() => {
        modalSuccess.LoadScript();
        return;
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
                {/* general form elements */}
                <div className="card card-success mt-2">
                  <div className="card-header">
                    <h3 className="card-title">CREATE REQUEST</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form>
                    <div className="card-body">
                      {/* From */}
                      <div className="form-group">
                        <label htmlFor="inputFrom">From</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputFrom"
                          value={this.state.name}
                          readOnly
                        />
                      </div>
                      {/* Add Product */}
                      <div className="form-group">
                        <label htmlFor="inputWarehouse">Add Products</label>
                        <div className="form-inline">
                          <div className="form-group mb-2">
                            <label htmlFor="inputProduct" className="sr-only">
                              Select Product
                            </label>
                            <select
                              className={
                                this.state.isProductValid === ""
                                  ? "custom-select"
                                  : this.state.isProductValid
                                  ? "custom-select is-valid"
                                  : "custom-select is-invalid"
                              }
                              onChange={this.handleIdProduct}
                            >
                              <option>Select Product</option>
                              {this.state.products.map((product, idx) => {
                                return (
                                  <option key={idx} value={product.id_product}>
                                    {product.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="form-group mx-sm-3 mb-2">
                            <label htmlFor="inputQuantity" className="sr-only">
                              Quantity
                            </label>
                            <input
                              type="number"
                              className={
                                this.state.isQuantityValid === ""
                                  ? "form-control"
                                  : this.state.isQuantityValid
                                  ? "form-control is-valid"
                                  : "form-control is-invalid"
                              }
                              id="inputPrice"
                              placeholder="Enter Quantity..."
                              value={this.state.quantity}
                              onChange={this.handleQuantity}
                              onBlur={this.handleQuantity}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-success mb-2"
                            onClick={() => {
                              this.handleAddProduct();
                            }}
                          >
                            Add Products
                          </button>
                        </div>
                      </div>
                      {/* table list product */}
                      <div className="form-group">
                        <table className="table table-striped table-sm mt-2">
                          <thead>
                            <tr>
                              <th scope="col">ID Product</th>
                              <th scope="col">Product Name</th>
                              <th scope="col">Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.products_selected.map(
                              (request, idx) => {
                                return (
                                  <tr key={idx}>
                                    <td>{request.id_product}</td>
                                    <td>{request.name}</td>
                                    <td>{request.quantity}</td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="card-footer">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={this.handleSave}
                        >
                          Save Data
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                {/* /.card */}
              </div>
            </div>
          </div>
        </section>
        <ModalFailed message={"Please enter the data correctly!"} />
        <ModalSuccess message={"Data has been saved!"} />
      </div>
    );
  }
}
