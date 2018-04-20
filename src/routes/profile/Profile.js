import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../components/button";
import Helmet from "react-helmet";
import { updateOneUser, postImage } from "../../actions/auth";
import { getRead, deleteRead } from "../../actions/books";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Link } from "react-router-dom";
import queryString from "query-string";

import ReadBooks from "../../components/readBooksList";

class Profile extends Component {
  state = {
    username: "",
    password: "",
    passwordAgain: "",
    image: null,
    match: true
  };

  componentDidUpdate() {
    //this.checkMatch();
  }

  handleInputChange = e => {
    const { name, value, files } = e.target;

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

  handleImageSubmit = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { image } = this.state;
    dispatch(postImage({ image }));
  };

  render() {
    const { isFetching, message = null, reviews, user } = this.props;

    const {
      username,
      password,
      passwordAgain,
      image,
      match,
      page
    } = this.state;

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

    if (!match) {
      alert = <div className="alert--danger">Passwords don't match!</div>;
    }

    if (isFetching) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Upplýsingar</h1>
        <ReactCSSTransitionGroup
          transitionName="registerAnimation"
          transitionAppear={true}
          transitionAppearTimeout={1500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Helmet title={` Prófíll - ${user.username}`} />
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
          <div className="register--container">
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
              <Button children="Uppfæra nafn" disabled={isFetching} />
            </form>
          </div>

          <div className="register--container">
            {!match && <div>Passwords don't match!</div>}
            <form onSubmit={this.handleSubmit}>
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
    message: state.auth.message,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Profile);
