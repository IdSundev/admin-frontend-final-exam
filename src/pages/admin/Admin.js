import React, { Component } from 'react'
import { withRouter } from "react-router";
import Header from '../../components/admin/Header';
import Main from '../../components/admin/Main';

class Admin extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main page={!this.props.match.params.id ? 1 : this.props.match.params.id}/>
      </div>
    )
  }
}

export default withRouter(Admin)
