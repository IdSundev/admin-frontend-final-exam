import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class ModalReject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveSuccess: false,
    };
  }

  backToDetailRequestIn = () => {
    this.setState({ saveSuccess: true });
    this.props.setStateReject()
  };
  render() {
    if (this.state.saveSuccess === true) {
      return (
        <Redirect to={`/admin/requestsin/detail/${this.props.id_request}`} />
      );
    }
    return (
      <div>
        <div className="modal fade" id="modal-sm-reject">
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
                  onClick={this.backToDetailRequestIn}
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
    );
  }
}
