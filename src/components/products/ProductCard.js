import React, { Component } from "react";
import { url_backend } from "../../config/url";
import "../../assets/css/style.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import ModalConfirmation from "../modal/products/ModalConfirmation";
import axios from "axios";

const modalConfirmation = require("../../helpers/modalConfirmation");
const currency = require("../../helpers/formatRupiah");

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_product_selected: "",
      product_name_selected: "",
      redirect_url: false,
      // page: null,
    };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.showWarningDelete = this.showWarningDelete.bind(this);
  }

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
        <div className="card card-outline card-primary">
          <div className="card-header">
            <h3 className="card-title">
              <b>{this.props.product.name}</b>
            </h3>
            <div className="card-tools"></div>
            {/* /.card-tools */}
          </div>
          {/* /.card-header */}
          <div className="card-body">
            <center>
              <img
                src={`${url_backend}/public/img/products/${this.props.product.picture}`}
                className="admin-img-products"
                alt={`${this.props.product.name}`}
              />
              <div className="mt-2">Rp. {currency.FormatRupiah(this.props.product.price)}</div>
              <div className="mt-4">
                <Link to={`/admin/products/${this.props.product.id_product}/edit`}>
                  <button className="btn btn-warning btn-sm ml-2">
                    Edit <i className="fa fa-edit"></i>
                  </button>
                </Link>
                &nbsp;
                <button
                  className="btn btn-danger btn-sm mr-2"
                  onClick={() =>
                    this.showWarningDelete(this.props.product.id_product, this.props.product.name)
                  }
                >
                  Delete <i className="fa fa-trash"></i>
                </button>
              </div>
            </center>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
        <ModalConfirmation
          message={`Apakah anda akan menghapus ${this.state.product_name_selected}?`}
          id_product={this.state.id_product_selected}
          deleteProduct={this.deleteProduct}
        />
      </div>
    );
  }
}
