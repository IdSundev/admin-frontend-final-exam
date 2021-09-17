import React, { Component } from "react";
import { url_backend } from "../../config/url";
import "../../assets/css/style.css";
import axios from "axios";
import ModalFailed from "../modal/products/ModalFailed";
import ModalSuccess from "../modal/products/ModalSuccess";
const modalFail = require("../../helpers/modalFailed");
const modalSuccess = require("../../helpers/modalSuccess");

export default class Edit extends Component {
  componentDidMount() {
    this.getCategories();
    this.getProduct();
  }

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      name: "",
      isNameValid: "",
      price: 0,
      isPriceValid: "",
      picture: "",
      image: "",
      isPictureValid: "",
      description: "",
      id_category: "",
      isCategoryValid: "",
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  getProduct = () => {
    axios
      .get(`${url_backend}/products/edit/${this.props.id_product}`)
      .then((res) => {
        this.setState({
          id_product: res.data.product[0].id_product,
          name: res.data.product[0].name,
          price: res.data.product[0].price,
          picture: res.data.product[0].picture,
          oldPicture: res.data.product[0].picture,
          image: `${url_backend}/public/img/products/${res.data.product[0].picture}`,
          id_category: res.data.product[0].id_category,
          description: res.data.product[0].description,
        });
        // console.log(res.data.product)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getCategories = () => {
    axios
      .get(`${url_backend}/categories`)
      .then((res) => {
        this.setState({ categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleName = (event) => {
    const { value } = event.target;
    this.setState({ name: value });
    this.state.name.length > 5
      ? this.setState({ isNameValid: true })
      : this.setState({ isNameValid: false });
  };

  handlePrice = (event) => {
    const { value } = event.target;
    this.setState({ price: value });
    this.state.price > 0
      ? this.setState({ isPriceValid: true })
      : this.setState({ isPriceValid: false });
  };

  handlePicture = (event) => {
    const value = event.target.files[0];
    this.setState({
      isPictureValid: true,
      image: URL.createObjectURL(value),
      picture: value,
    });
  };

  handleDescription = (event) => {
    const { value } = event.target;
    this.setState({ description: value });
  };

  handleIdCategory = (event) => {
    const { value } = event.target;
    this.setState({ id_category: event.target.value });
    value !== "Select Category"
      ? this.setState({
          isCategoryValid: true,
          id_category: value,
        })
      : this.setState({
          isCategoryValid: false,
          id_category: "",
        });
  };

  handleUpdate = () => {
    if (
      this.state.name === "" ||
      this.state.price === 0 ||
      this.state.price === "" ||
      this.state.id_category === ""
    ) {
      modalFail.LoadScript();
      return;
    }

    const formData = new FormData();

    formData.append("id_product", this.state.id_product);
    formData.append("id_category", this.state.id_category);
    formData.append("name", this.state.name);
    formData.append("price", this.state.price);
    formData.append("description", this.state.description);
    formData.append("picture", this.state.picture);
    formData.append("oldPicture", this.state.oldPicture);

    axios
      .post(`${url_backend}/products/update/${this.state.id_product}`, formData, {})
      .then((res) => {
        modalSuccess.LoadScript();
      })
      .catch((err) => {
        modalFail.LoadScript();
      });

    modalSuccess.LoadScript();
  };

  render() {
    return (
      <div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="card card-warning mt-2">
                  <div className="card-header">
                    <h3 className="card-title">Edit Product</h3>
                  </div>
                  <form>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="inputName">
                          Product <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={
                            this.state.isNameValid === ""
                              ? "form-control"
                              : this.state.isNameValid
                              ? "form-control is-valid"
                              : "form-control is-invalid"
                          }
                          id="inputName"
                          placeholder="Enter product name..."
                          value={this.state.name}
                          onBlur={this.handleName}
                          onChange={this.handleName}
                        />
                        {this.state.isNameValid ? (
                          ""
                        ) : (
                          <span
                            id="inputName-error"
                            className="error invalid-feedback"
                          >
                            Please provide a product name! (character &ge; 5)
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="inputCategory">
                          Category <span className="text-danger">*</span>
                        </label>
                        <select
                          className={
                            this.state.isCategoryValid === ""
                              ? "custom-select"
                              : this.state.isCategoryValid
                              ? "custom-select is-valid"
                              : "custom-select is-invalid"
                          }
                          value={this.state.id_category}
                          onChange={this.handleIdCategory}
                        >
                          {this.state.categories.map((category, idx) => {
                            if (
                              parseInt(category.id_category) === parseInt(this.state.id_category)
                            ) {
                              return (
                                <option
                                  key={idx}
                                  value={category.id_category}
                                  selected
                                >
                                  {category.category}
                                </option>
                              );
                            } else {
                              return (
                                <option key={idx} value={category.id_category}>
                                  {category.category}
                                </option>
                              );
                            }
                          })}
                        </select>
                        {this.state.isCategoryValid ? (
                          ""
                        ) : (
                          <span
                            id="inputCategory-error"
                            className="error invalid-feedback"
                          >
                            Please provide a product category!
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="inputPrice">
                          Price <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className={
                            this.state.isPriceValid === ""
                              ? "form-control"
                              : this.state.isPriceValid
                              ? "form-control is-valid"
                              : "form-control is-invalid"
                          }
                          id="inputPrice"
                          placeholder="Enter product price..."
                          value={this.state.price}
                          onChange={this.handlePrice}
                          onBlur={this.handlePrice}
                        />
                        {this.state.isPriceValid ? (
                          ""
                        ) : (
                          <span
                            id="inputName-error"
                            className="error invalid-feedback"
                          >
                            Please provide a product price!
                          </span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="inputPicture">
                          Select Picture <span className="text-danger">*</span>
                        </label>
                        <div className="form-group">
                          <img
                            src={this.state.image}
                            className="img-thumbnail img-input-product"
                            alt="..."
                          />
                          <div className="custom-file mt-2">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="customFile"
                              onChange={this.handlePicture}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Choose file
                            </label>
                            {this.state.isPictureValid ? (
                              ""
                            ) : (
                              <span
                                id="inputName-error"
                                className="error invalid-feedback"
                              >
                                Please provide a product picture!
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

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
                    </div>
                    <div className="card-footer">
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={this.handleUpdate}
                      >
                        Update Product
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ModalFailed message={"Please enter the data correctly!"} />
        <ModalSuccess message={"Data has been updated!"} />
      </div>
    );
  }
}
