import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { url_backend } from "../../config/url";
import {Redirect} from 'react-router-dom'

const cookies = new Cookies()

export default class Login extends Component {

  constructor() {
    super();

    this.state = {
      login: false
    };
  }

  componentWillMount() {
    let jwtToken = cookies.get('jwtToken');

    if (jwtToken !== undefined) {
      this.setState({
        login: true
      })
    }
  }

  insert(refs) {
    var self = this;
    console.log(refs.username.value)
    console.log(refs.password.value)

    let formData = {
      username: refs.username.value,
      password: refs.password.value,
    }

    console.log(formData)

    axios.post(`${url_backend}/admin/login`, formData, {
    }).then(function (response) {

      console.log(response.data)

      if (response.data.login) {
        cookies.set('jwtToken', response.data.token, { path: '/' });
        cookies.set('id_warehouse', response.data.id_warehouse, { path: '/' });

        self.setState({
          login: true
        })
      }

    }).catch(function (err) {
      console.log(err);

    });
  }



  render() {

    if (this.state.login === true) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="card card-success mt-2">
                  <div className="card-header">
                    <h3 className="card-title">Login</h3>
                  </div>
                  <form>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="username">
                          Username <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Username..."
                          ref="username"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">
                          Password <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Password..."
                          ref="password"
                        />
                      </div>
                    </div>
                    <div className="card-footer">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => this.insert(this.refs)}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
