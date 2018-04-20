import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../components/button";
import Helmet from "react-helmet";
import { updateOneUser, postImage } from "../../actions/auth";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PropTypes from "prop-types";

import ReadBooks from "../../components/readBooksList";

class Profile extends Component {
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
    message: PropTypes.array,
    isFetching: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      name: PropTypes.string,
      username: PropTypes.string
    })
  };

  state = {
    username: "",
    password: "",
    passwordAgain: "",
    image: null,
    match: true
  };

  handleInputChange = e => {
    const { name, value, files } = e.target;

    e.preventDefault()

    if (name) {
      this.setState({ [name]: value }, this.checkMatch.bind(false));
    }

    if (files) {
      this.setState({ [name]: files[0] });
    }
  };

  checkMatch = letsGo => {
    const { dispatch } = this.props;
    const { username, password, passwordAgain } = this.state;
    if (password !== passwordAgain) {
      this.setState({ match: false });
    } else {
      if (letsGo) {
        dispatch(updateOneUser({ username, password }));
      }
      this.setState({ match: true });
    }
  };

  handleUpdateNameSubmit = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username } = this.state;

    dispatch(updateOneUser({ username }));
  };

  handleImageSubmit = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { image } = this.state;
    dispatch(postImage({ image }));
  };

  render() {
    const { isFetching, user, message } = this.props;

    const { username, password, passwordAgain, match } = this.state;

    if (isFetching) {
      return <div>Loading...</div>;
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
      <div>
        <h1>Upplýsingar</h1>
        <Helmet title={` Prófíll - ${user.username}`} />
        <ReactCSSTransitionGroup
          transitionName="registerAnimation"
          transitionAppear={true}
          transitionAppearTimeout={1500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div className="register--container">
            <form
              method="post"
              encType="multipart/form-data"
              onSubmit={this.handleImageSubmit}
            >
              <div className="register--input">
                <input
                  required
                  id="image"
                  name="image"
                  type="file"
                  onChange={this.handleInputChange}
                />
                <Button disabled={isFetching}>Uppfæra</Button>
              </div>
            </form>
          </div>
          {alert}
          <div className="register--container">
            <form onSubmit={this.handleUpdateNameSubmit}>
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
              <Button children="Uppfæra nafn" disabled={isFetching} />
            </form>
          </div>

          <div className="register--container">
            {!match && <div>Passwords don't match!</div>}
            <form onSubmit={this.checkMatch}>
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
                <label htmlFor="passwordAgain">Password Again: </label>
                <input
                  required
                  id="passwordAgain"
                  name="passwordAgain"
                  type="password"
                  value={passwordAgain}
                  onChange={this.handleInputChange}
                />
              </div>
              <Button
                type='button'
                className={match ? "" : "disable"}
                children="Uppfæra lykilorð"
                disabled={isFetching}
              />
            </form>
          </div>
        </ReactCSSTransitionGroup>
        <ReadBooks meReadBooks={true} deleteOption={true} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isFetching: state.auth.isFetching,
    user: state.auth.user,
    message: state.auth.message
  };
};

export default connect(mapStateToProps)(Profile);
