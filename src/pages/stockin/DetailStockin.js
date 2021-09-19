import React, { Component } from 'react'
import { withRouter } from "react-router";
import Header from '../../components/stockin_detail/Header';
import Main from '../../components/stockin_detail/Main';

class DetailStockin extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main id_stock_in={this.props.match.params.id}/>
      </div>
    )
  }
}

export default withRouter(DetailStockin)
