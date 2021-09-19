import React, { Component } from 'react'
import { withRouter } from "react-router";
import Header from '../../components/requestin/Header';
import Main from '../../components/requestin/Main';

class Requestin extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main page={!this.props.match.params.id ? 1 : this.props.match.params.id}/>
      </div>
    )
  }
}

export default withRouter(Requestin);
