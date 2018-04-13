import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../components/button";
import { updateOneUser, postImage } from "../../actions/auth";

class Profile extends Component {
  state = {
    username: "",
    password: "",
    image: null
  };
  handleInputChange = e => {
    const { name, value, files } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username, password } = this.state;

    dispatch(updateOneUser({ username, password }));

    this.setState({ username: "", password: "" });
  };

  handleImageSubmit = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { image } = this.state;

    dispatch(postImage({ image }));
  };

  render() {
    const { isFetching, message = null } = this.props;

    const { username, password, image } = this.state;

    let a;
    if (!Array.isArray(message) && message) {
      a = <div>{message}</div>;
    } else {
      a =
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
        {a}
        <h1>Upplýsingar</h1>

        <form onSubmit={this.handleImageSubmit}>
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
              type="text"
              value={password}
              onChange={this.handleInputChange}
            />
          </div>
          <Button disabled={isFetching}>Uppfæra</Button>
        </form>
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
