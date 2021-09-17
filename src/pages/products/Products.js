import React, { Component } from "react";
import Header from "../../components/products/Header";
import Main from "../../components/products/Main";
import { withRouter } from "react-router";

class Products extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main page={!this.props.match.params.id ? 1 : this.props.match.params.id}/>
      </div>
    );
  }
}

export default withRouter(Products)