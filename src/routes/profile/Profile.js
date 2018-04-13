import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../components/button";
import { updateOneUser } from "../../actions/auth";

class Profile extends Component {
  state = {
    username: "",
    password: "",
    image: "",
  };
  handleInputChange = e => {
    const { name, value, files } = e.target;


    if (name) {
      this.setState({ [name]: value });
    }

    if(name === 'image') {
      this.setState({ [name]: files});
    }
    
  };

  handleSubmit = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username, password, image } = this.state;

    dispatch(updateOneUser({ username, password }));
  };

  render() {
    const { isFetching, message } = this.props;

    const { username, password } = this.state;

    return (
      <div>
        <h1>Upplýsingar</h1>
        {message &&
          message.map((item, index) => {
            return (
              <div key={index}>
                <p>{item.field}</p>
                <p>{item.message}</p>
              </div>
            );
          })}

        <form onSubmit={this.handleSubmit}>
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
    isFetching: state.getAllUsers.isFetching,
    message: state.getAllUsers.message,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Profile);
