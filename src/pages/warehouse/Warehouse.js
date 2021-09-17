import React, { Component } from 'react'
import Header from '../../components/warehouse/Header'
import Main from '../../components/warehouse/Main'
import { withRouter } from "react-router";

class Warehouse extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main  page={!this.props.match.params.id ? 1 : this.props.match.params.id}/>
      </div>
    )
  }
}

export default withRouter(Warehouse)
