import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { registerUser } from "../../actions/register";
import Button from "../../components/button";
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PropTypes from "prop-types";
import "./Register.css";

class Register extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.shape({
      action: PropTypes.string,
      block: PropTypes.func,
      go: PropTypes.func,
      goBack: PropTypes.func,
      goForward: PropTypes.func,
      length: PropTypes.number,
      listen: PropTypes.func
    }),
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string
    }),
    match: PropTypes.shape({
      path: PropTypes.string,
      url: PropTypes.string,
      isExact: PropTypes.bool,
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }),
    message: PropTypes.array
  };

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

    let alert;
    if (!Array.isArray(message) && message) {
      alert = <p className="alert--text">{message}</p>;
    } else {
      alert =
        message &&
        message.map((item, index) => {
          return (
            <div key={index}>
              <p className="alert--text">{item.message}</p>
            </div>
          );
        });
    }
    
    return (
      <ReactCSSTransitionGroup
        transitionName="registerAnimation"
        transitionAppear={true}
        transitionEnter={false}
        transitionAppearTimeout={2000}
        transitionLeave={false}
      >
        <Helmet title="Nýskráning" />
        <div className="register--container">
          <ReactCSSTransitionGroup
            transitionName="messageAnimation"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnter={false}
            transitionLeave={false}
          >
            {alert}
          </ReactCSSTransitionGroup>
          <h1>Nýskráning</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="register--input">
              <label htmlFor="username">Username: </label>
              <input
                required
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
                required
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
                required
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
              <Link to="/login">Innskráning</Link>
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
