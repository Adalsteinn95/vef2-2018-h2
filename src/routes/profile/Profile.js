import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../components/button";
import { updateOneUser, postImage } from "../../actions/auth";
import { getRead, deleteRead } from "../../actions/books";
import { Link } from "react-router-dom";
import queryString from "query-string";

import ReadBooks from '../../components/readBooksList';

class Profile extends Component {

  state = {
    username: "",
    password: "",
    passwordAgain: "",
    image: null,
    match: true,
    page: this.urlpage > 0 ? this.urlpage : 0,
  };
  

  handleInputChange = e => {
    const { name, value, files } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
    
    if (files) {
      this.setState({ [name]: files[0]});
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username, password, passwordAgain } = this.state;

    if(password !== passwordAgain){
      this.setState({match: false});
    } else {
      this.setState({match: true});
      dispatch(updateOneUser({ username, password }));
    }
  };

  handleDelete = e => {
    e.preventDefault();

    const {
      dispatch
    } = this.props;

    dispatch(deleteRead(e.target.parentNode.id, '/users/me/read'))

  }

  handleImageSubmit = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { image } = this.state;
    dispatch(postImage({ image }));
  };

  render() {

    const { isFetching, message = null, reviews } = this.props;

    const { username, password, passwordAgain, image, match, page } = this.state;

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

    if(!match) {
      alert = <div>Password don't match!</div>;
    }

    if(isFetching) {
      return (
        <div>Loading...</div>
      );
    }

    console.info(this.urlpage);

    return (
      <div>
        {alert}
        <h1>Upplýsingar</h1>

        <form method='post' encType="multipart/form-data" onSubmit={this.handleImageSubmit}>
          <div>
            <label htmlFor="image">image: </label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={this.handleInputChange}
            />
          </div>
          <Button disabled={isFetching}>Uppfæra</Button>
        </form>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={this.handleInputChange}
            />
          </div>
          <Button disabled={isFetching}>Uppfæra</Button>
        </form>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="passwordAgain">Password Again: </label>
            <input
              id="passwordAgain"
              name="passwordAgain"
              type="password"
              value={passwordAgain}
              onChange={this.handleInputChange}
            />
          </div>
          <Button disabled={isFetching}>Uppfæra</Button>
        </form>
        <ReadBooks />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isFetching: state.auth.isFetching,
    message: state.auth.message,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Profile);
