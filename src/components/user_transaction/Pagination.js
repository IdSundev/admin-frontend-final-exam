import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Pagination extends Component {
  render() {
    return (
      <div>
        <div className="row mt-4 mb-4">
          <div className="col-12">
            <center>
              <Link to="/admin/transactions/1">
                <button
                  className="btn btn-outline-primary mr-2"
                  style={{ background: "white" }}
                >
                  &#60;&#60;
                </button>
              </Link>
              <Link to={`/admin/transactions/${this.props.links.previous}`}>
                <button
                  className="btn btn-outline-primary mr-2"
                  style={{ background: "white" }}
                >
                  &#60;
                </button>
              </Link>
              {this.props.links.pages.map((page, idx) => {
                if (page === "...") {
                  return (
                    <button
                      key={idx}
                      className="btn btn-outline-secondary ml-1 mr-1"
                      style={{ background: "white" }}
                      disabled
                    >
                      {page}
                    </button>
                  );
                }
                if (page === parseInt(this.props.pageSelected)) {
                  return (
                    <button key={idx} className="btn btn-primary ml-1 mr-1">
                      {page}
                    </button>
                  );
                } else {
                  return (
                    <Link to={`/admin/transactions/${page}`} key={idx}>
                      <button
                        className="btn btn-outline-primary ml-1 mr-1"
                        style={{ background: "white" }}
                      >
                        {page}
                      </button>
                    </Link>
                  );
                }
              })}
              <Link to={`/admin/transactions/${this.props.links.next}`}>
                <button className="btn btn-outline-primary ml-2">&gt;</button>
              </Link>
              <Link to={`/admin/transactions/${this.props.links.last_page}`}>
                <button className="btn btn-outline-primary ml-2">
                  &gt;&gt;
                </button>
              </Link>
            </center>
          </div>
        </div>
      </div>
    );
  }
}
