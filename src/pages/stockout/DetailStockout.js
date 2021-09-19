import React, { Component } from 'react'
import { withRouter } from "react-router";
import Header from '../../components/stockout_detail/Header';
import Main from '../../components/stockout_detail/Main';

class DetailStockout extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main id_stock_out={this.props.match.params.id}/>
      </div>
    )
  }
}

export default withRouter(DetailStockout);
