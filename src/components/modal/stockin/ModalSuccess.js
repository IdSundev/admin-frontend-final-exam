import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

export default class ModalSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveSuccess: false,
    };
  }

  backToStockin = () => {
    this.setState({saveSuccess:true})
  }

  render() {
    if (this.state.saveSuccess === true) {
      return <Redirect to="/admin/stockin" />;
    }

    return (
      <div>
        <div className="modal fade" id="modal-sm-success">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header bg-success">
                <h4 className="modal-title">Success</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{this.props.message}</p>
              </div>
              <div className="modal-footer justify-content-between">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  onClick = {this.backToStockin}
                >
                  OK
                </button>
              </div>
            </div>
            {/* /.modal-content */}
          </div>
          {/* /.modal-dialog */}
        </div>
        {/* /.modal */}
      </div>
    )
  }
}
