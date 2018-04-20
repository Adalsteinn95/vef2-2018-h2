import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
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

  componentDidMount() {
    this.maybeRedirect();
  }

  getDerivedStateFromProps() {
    console.log("getDerivedStateFromProps");
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    if (name) {
      this.setState({ [name]: value });
    }
  };

  maybeRedirect = () => {
    const { isAuthenticated, history } = this.props;
    if (isAuthenticated) {
      history.push("/");
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username, password } = this.state;

    dispatch(loginUser({ username, password }, "/login")).then(() => {
      this.maybeRedirect();
    });
  };

  handleLogout = e => {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(logoutUser());
  };

  render() {
    const { username, password } = this.state;

    const { isAuthenticated, isFetching, message } = this.props;

    console.info(this.props);
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
    console.log(message, alert);

    return (
      <ReactCSSTransitionGroup
        transitionName="registerAnimation"
        transitionAppear={true}
        transitionAppearTimeout={1500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Helmet title="Innskráning" />
        <div className="register--container">
          <h1>Innskráning</h1>
          <ReactCSSTransitionGroup
            transitionName="messageAnimation"
            transitionAppear={true}
            transitionAppearTimeout={10000}
            transitionEnter={false}
            transitionLeave={false}
          >
            {alert}
          </ReactCSSTransitionGroup>
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
