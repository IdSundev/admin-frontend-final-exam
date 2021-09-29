import React, { Component } from 'react'
import { withRouter } from "react-router";
import Header from '../../components/user_transaction/Header';
import Main from '../../components/user_transaction/Main';

class UserTransaction extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main page={!this.props.match.params.id ? 1 : this.props.match.params.id}/>
      </div>
    )
  }
}

export default withRouter(UserTransaction);