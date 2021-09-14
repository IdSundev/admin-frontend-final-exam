import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Preload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: window.location.pathname.split("preload")[1],
      redirect_url: false
    };
  }

  componentDidMount(){
    console.log(this.state.page)
    this.setState({redirect_url: true})
  }

  render() {
    if (this.state.redirect_url === true) {
      return (<div><Redirect to={`/admin${this.state.page}`} /></div>);
    }
    return (
      <div>
      </div>
    );
  }
}
