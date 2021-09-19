import React, { Component } from 'react'
import { withRouter } from "react-router";
import Header from '../../components/requestin_detail/Header';
import Main from '../../components/requestin_detail/Main';

class DetailRequestin extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main id_request={this.props.match.params.id}/>
      </div>
    )
  }
}

export default withRouter(DetailRequestin);
