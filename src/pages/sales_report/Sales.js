import React, { Component } from 'react'
import Header from '../../components/sales_report/Header'
import Main from '../../components/sales_report/Main'
import { withRouter } from "react-router";

class Sales extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main page={!this.props.match.params.id ? 1 : this.props.match.params.id}/>
      </div>
    )
  }
}

export default withRouter(Sales);
