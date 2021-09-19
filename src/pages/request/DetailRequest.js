import React, { Component } from 'react'
import Header from '../../components/request_detail/Header'
import Main from '../../components/request_detail/Main'
import { withRouter } from "react-router";

class DetailRequest extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main id_request={this.props.match.params.id}/>
      </div>
    )
  }
}

export default withRouter(DetailRequest)