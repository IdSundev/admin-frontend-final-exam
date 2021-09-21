import React, { Component } from "react";
import axios from "axios";
import { url_backend } from "../../config/url";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import ModalFailed from "../modal/stockin/ModalFailed";
import ModalSuccess from "../modal/stockin/ModalSuccess";
const modalFail = require("../../helpers/modalFailed");
const modalSuccess = require("../../helpers/modalSuccess");

export default class Add extends Component {
  componentDidMount() {
    this.getWarehouse();
    this.getProducts();
  }

  constructor(props) {
    super(props);
    this.state = {
      warehouse: [],
      id_warehouse: "",
      id_destination_warehouse: 1,
      isWarehouseValid: "",
      date: new Date(),
      isDateValid: "",
      description: "",
      products: [],
      products_selected: [],
      id_product: "",
      name_product: "",
      isProductValid: "",
      quantity: "",
      isQuantityValid: "",
    };
    this.getWarehouse = this.getWarehouse.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.handleIdWarehouse = this.handleIdWarehouse.bind(this);
    this.handleIdProduct = this.handleIdProduct.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
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

  handleIdWarehouse = (event) => {
    const { value } = event.target;
    this.setState({ id_warehouse: event.target.value });
    value !== "Select Warehouse"
      ? this.setState({
          isWarehouseValid: true,
          id_warehouse: value,
        })
      : this.setState({
          isWarehouseValid: false,
          id_warehouse: "",
        });
  };

  handleDate = (date) => {
    this.setState({ date: date });
  };

  handleDescription = (event) => {
    const { value } = event.target;
    this.setState({ description: value });
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
      description: this.state.description,
    });
    this.setState({
      products_selected: data,
      id_product: "",
      quantity: "",
    });
  };

  handleSave = () => {
    // console.log(this.state.id_warehouse)
    // console.log(this.state.id_destination_warehouse)
    // console.log(moment(this.state.date).format("YYYY-MM-DD HH:mm:ss"))
    // console.log(this.state.description)
    // console.log(this.state.products_selected)
    if (
      this.state.id_warehouse === "" ||
      this.state.date === "" ||
      this.state.products_selected.length === 0
    ) {
      modalFail.LoadScript();
      return;
    }

    axios
      .post(`${url_backend}/stockin`, {
        id_original_warehouse: this.state.id_warehouse,
        id_destination_warehouse: this.state.id_destination_warehouse,
        date_of_entry: moment(this.state.date).format("YYYY-MM-DD HH:mm:ss"),
        description: this.state.description,
      })
      .then((res) => {
        this.state.products_selected.map((product) => {
          axios
            .post(`${url_backend}/stockin_detail`, {
              id_stock_in: res.data.id_stock_in,
              id_product: product.id_product,
              quantity: product.quantity,
              description: product.description,
            })
            .then(
              // console.log(res.data.id_stock_in)
              axios
                .get(
                  `${url_backend}/stocks/detail?id_warehouse=${this.state.id_destination_warehouse}&id_product=${product.id_product}`
                )
                .then((res) => {
                  axios.post(`${url_backend}/stocks/update`, {
                    id_stock: res.data.stock[0].id_stock,
                    available: parseInt(res.data.stock[0].available) + parseInt(product.quantity),
                    non_available: res.data.stock[0].non_available,
                  });
                })
                .catch((err) => {
                  axios
                    .post(`${url_backend}/stocks`, {
                      id_warehouse: this.state.id_destination_warehouse,
                      id_product: product.id_product,
                      available: product.quantity,
                      non_available: 0
                    })
                })
            )
            .catch((err) => {
              console.log(err);
            });
        });
        modalSuccess.LoadScript();
      })
      .catch((err) => {
        modalFail.LoadScript();
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
                    <h3 className="card-title">Add Stock Going In</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form>
                    <div className="card-body">
                      {/* Select Warehouse */}
                      <div className="form-group">
                        <label htmlFor="inputWarehouse">
                          Warehouse <span className="text-danger">*</span>
                        </label>
                        <select
                          className={
                            this.state.isWarehouseValid === ""
                              ? "custom-select"
                              : this.state.isWarehouseValid
                              ? "custom-select is-valid"
                              : "custom-select is-invalid"
                          }
                          onChange={this.handleIdWarehouse}
                        >
                          <option>Select Warehouse</option>
                          {this.state.warehouse.map((warehouse, idx) => {
                            return (
                              <option key={idx} value={warehouse.id_warehouse}>
                                {warehouse.detail_address}
                              </option>
                            );
                          })}
                        </select>
                        {this.state.isWarehouseValid ? (
                          ""
                        ) : (
                          <span
                            id="inputWarehouse-error"
                            className="error invalid-feedback"
                          >
                            Please provide a Warehouse!
                          </span>
                        )}
                      </div>
                      {/* Date */}
                      <div className="form-group">
                        <label htmlFor="inputDate">
                          Date <span className="text-danger">*</span>
                        </label>
                        <DatePicker
                          className={
                            this.state.isDateValid === ""
                              ? "form-control"
                              : this.state.isDateValid
                              ? "form-control is-valid"
                              : "form-control is-invalid"
                          }
                          id="inputDate"
                          dateFormat="yyyy-MM-dd H:mm:ss"
                          selected={this.state.date}
                          name="date"
                          // onChange={this.handleDate}
                          showTimeInput
                          onChange={this.handleDate}
                        />
                        {this.state.isDateValid ? (
                          ""
                        ) : (
                          <span
                            id="inputName-error"
                            className="error invalid-feedback"
                          >
                            Please provide a Date!
                          </span>
                        )}
                      </div>
                      {/* description */}
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          placeholder="Description Product"
                          defaultValue={this.state.description}
                          onChange={this.handleDescription}
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
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.handleSave}
                      >
                        Save Data
                      </button>
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
