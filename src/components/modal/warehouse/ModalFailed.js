import React, { Component } from "react";

export default class ModalFailed extends Component {
  render() {
    return (
      <div>
        <div className="modal fade" id="modal-sm-failed">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header bg-danger">
                <h4 className="modal-title">Failed</h4>
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
                >
                  Close
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
