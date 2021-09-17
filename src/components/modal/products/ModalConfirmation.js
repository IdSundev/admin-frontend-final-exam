import React, { Component } from "react";

export default class ModalConfirmation extends Component {
  
  deleteProduct = () => {
    this.props.deleteProduct(this.props.id_product);
  }

  render() {
    return (
      <div>
        <div className="modal fade" id="modal-sm-warning">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header bg-warning modal-sm">
                <h4 className="modal-title">Warning</h4>
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
                  onClick={this.deleteProduct}
                >
                  Ya
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
