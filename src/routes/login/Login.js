import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../../actions/auth";
import Button from "../../components/button";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Link } from "react-router-dom";

import "./Login.css";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    if (name) {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username, password } = this.state;

    dispatch(loginUser({ username, password }, "/login"));
  };

  handleLogout = e => {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(logoutUser());
  };

  render() {
    const { username, password } = this.state;

    const { isAuthenticated, isFetching, message } = this.props;

    if (isAuthenticated) {
      return <Button onClick={this.handleLogout}>Útskrá</Button>;
    }

    if (isFetching) {
      return (
        <p>
          Skrái inn <em>{username}</em>...
        </p>
      );
    }

    let alert;
    if (!Array.isArray(message) && message) {
      alert = <div>{message}</div>;
    } else {
      alert =
        message &&
        message.map((item, index) => {
          return (
            <div key={index}>
              <p>{item.field}</p>
              <p>{item.message}</p>
            </div>
          );
        });
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="registerAnimation"
        transitionAppear={true}
        transitionAppearTimeout={1500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="register--container">
          <h1>Innskráning</h1>
          {alert}
          <form onSubmit={this.handleSubmit}>
            <div className="register--input">
              <label htmlFor="username">Username: </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="register--input">
              <label htmlFor="password">Password: </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="login--button">
              <Button disabled={isFetching}>Innskrá</Button>
            </div>
          </form>
          <div>
            <Link to="/register">Nýskráning</Link>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

/* todo tengja við redux */

const mapStateToProps = state => {
  /* todo stilla redux ef það er notað */
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message
  };
};

export default connect(mapStateToProps)(Login);
