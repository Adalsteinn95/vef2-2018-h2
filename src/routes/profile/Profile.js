import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../components/button";
import { updateOneUser, postImage } from "../../actions/auth";
import { deleteRead } from "../../actions/books";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import ReadBooks from "../../components/readBooksList";

class Profile extends Component {
  state = {
    username: "",
    password: "",
    passwordAgain: "",
    image: null,
    match: true
  };

  handleInputChange = e => {
    const { name, value, files } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }

    if (files) {
      this.setState({ [name]: files[0] });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username, password, passwordAgain } = this.state;

    if (password !== passwordAgain) {
      this.setState({ match: false });
    } else {
      this.setState({ match: true });
      dispatch(updateOneUser({ username, password }));
    }
  };

  handleDelete = e => {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(deleteRead(e.target.parentNode.id, "/users/me/read"));
  };

  handleImageSubmit = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { image } = this.state;
    dispatch(postImage({ image }));
  };

  render() {
    const { isFetching, message = null } = this.props;

    const { username, password, passwordAgain, match } = this.state;

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

    if (isFetching) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {alert}
        <h1>Upplýsingar</h1>
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
                  id="passwordAgain"
                  name="passwordAgain"
                  type="password"
                  value={passwordAgain}
                  onChange={this.handleInputChange}
                />
              </div>
              <Button children="Uppfæra lykilorð" disabled={isFetching} />
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
