import axios from "axios";
import React, { Component } from "react";
import { url_backend } from "../../config/url";
import "../../assets/css/style.css";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate(prevProps) {
    if (this.props.page && this.props.page !== prevProps.page) {
      this.getProducts();
    }
  }

  getProducts = () => {
    axios
      .get(`${url_backend}/products?page=${this.props.page}`)
      .then((res) => {
        this.setState({ products: res.data.products });
        this.setState({ links: res.data.links });
      })
      .catch((err) => {
        console.log(err);
      });
  };

//   From Rasyid Hakim to Everyone:  07:49 PM
// {this.state.linkd && <Pagination>}
// From Rasyid Hakim to Everyone:  08:00 PM
// promise cancelation

  render() {
    if(!this.state.links) return null;
    return (
      <div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {this.state.products.map((product, idx) => {
                return (
                  <div className="col-3" key={idx}>
                    <ProductCard product={product} />
                  </div>
                );
              })}
            </div>
            <div className="row">
              <div className="col-md-12">
                <Pagination links={this.state.links} pageSelected={this.props.page}/>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
