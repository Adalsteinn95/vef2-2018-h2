import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/register";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "./Register.css";

class Register extends Component {
  state = {
    username: "",
    password: "",
    name: ""
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
    const { username, password, name } = this.state;
    dispatch(registerUser({ username, password, name }, "/register"));
  };

  render() {
    const { username, password, name } = this.state;

    const { isFetching, user, message, isAuthenticated } = this.props;

    if (isFetching) {
      return (
        <p>
          Skrái inn <em>{username}</em>...
        </p>
      );
    }

    if (user) {
      return (
        <div>
          <h1>Takk fyrir skráninguna {user.username}</h1>
        </div>
      );
    }

    if (isAuthenticated) {
      return (
        <div>
          <h1>Þú ert nú þegar innskráður!</h1>
        </div>
      );
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
          {message &&
            message.map((item, index) => {
              return (
                <div key={index}>
                  <p>{item.field}</p>
                  <p>{item.message}</p>
                </div>
              );
            })}
          <h1>Nýskráning</h1>
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
            <div className="register--input">
              <label htmlFor="name">Name: </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <Button disabled={isFetching}>Nýskrá</Button>
            </div>
            <div>
              <Link to="/login">innskráðning</Link>
            </div>
          </form>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

/* todo tengja við redux */

const mapStateToProps = state => {
  /* todo stilla redux ef það er notað */
  return {
    isFetching: state.register.isFetching,
    message: state.register.message,
    user: state.register.user,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Register);
