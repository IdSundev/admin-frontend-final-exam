import React, { Component } from 'react'
import { withRouter } from "react-router";
import Header from '../../components/user_transaction_detail/Header';
import Main from '../../components/user_transaction_detail/Main';

class DetailUserTransaction extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main id_transaction={this.props.match.params.id}/>
      </div>
    )
  }
}

export default withRouter(DetailUserTransaction);
