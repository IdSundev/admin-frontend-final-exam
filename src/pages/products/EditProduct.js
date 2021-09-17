import React, { Component } from 'react'
import Edit from '../../components/products/Edit'
import { withRouter } from "react-router";

class EditProduct extends Component {
  render() {
    return (
      <div>
        <Edit id_product={this.props.match.params.id} />
      </div>
    )
  }
}

export default withRouter(EditProduct)
