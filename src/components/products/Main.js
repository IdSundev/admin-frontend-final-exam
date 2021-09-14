import axios from "axios";
import React, { Component } from "react";
import { url_backend } from "../../config/url";
import "../../assets/css/style.css";
import { Link } from "react-router-dom";
import ModalConfirmation from "../modal/products/ModalConfirmation";
import { Redirect } from "react-router-dom";

const modalConfirmation = require("../../helpers/modalConfirmation");

export default class Main extends Component {
  componentDidMount() {
    this.getProducts();
    this.loadDataTable();
  }

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      id_product_selected: "",
      product_name_selected: "",
      redirect_url: false,
    };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.showWarningDelete = this.showWarningDelete.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  getProducts = () => {
    axios
      .get(`${url_backend}/products`)
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  loadDataTable = () => {
    const script = document.createElement("script");
    script.src = "/js/dataTableProducts.js";
    script.async = true;
    document.body.appendChild(script);
  };

  showWarningDelete = (id_product, name) => {
    this.setState({
      id_product_selected: id_product,
      product_name_selected: name,
    });
    modalConfirmation.LoadScript();
  };

  deleteProduct = (id_product) => {
    axios
      .post(`${url_backend}/products/delete`, {
        id_product: id_product,
      })
      .then(() => {
        alert("Data has been deleted");
        this.setState({ redirect_url: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (this.state.redirect_url === true) {
      return <Redirect to="/admin/preload/products" />;
    }
    return (
      <div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">LIST PRODUCTS</h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <Link to={`/admin/products/Add`}>
                      <button className="btn btn-success mb-2 btn-sm">
                        <i className="fa fa-plus"></i>
                        &nbsp; Add Product
                      </button>
                    </Link>
                    <table
                      id="example1"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>ID Product</th>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Picture</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.products.map((product, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{product.id_product}</td>
                              <td>{product.name}</td>
                              <td>{product.price}</td>
                              <td>{product.category}</td>
                              <td>
                                <img
                                  src={`${url_backend}/public/img/products/${product.picture}`}
                                  className="admin-img-products"
                                  alt={`Image ${idx}`}
                                />
                              </td>
                              <td>
                                <Link
                                  to={`/admin/products/${product.id_product}/edit`}
                                >
                                  <button className="btn btn-warning btn-sm">
                                    <i className="fa fa-edit"></i>
                                  </button>
                                </Link>
                                &nbsp;
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    this.showWarningDelete(
                                      product.id_product,
                                      product.name
                                    )
                                  }
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* /.card-body */}
                  {/* /.card */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <ModalConfirmation
          message={`Apakah anda akan menghapus ${this.state.product_name_selected}?`}
          id_product={this.state.id_product_selected}
          deleteProduct={this.deleteProduct}
        />
      </div>
    );
  }
}
