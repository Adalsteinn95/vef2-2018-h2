import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../../actions/auth';
import Button from "../../components/button";

/* todo sækja actions frá ./actions */

import './Login.css';

class Login extends Component {

  state = {
    username: '',
    password: '',
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name) {
      this.setState({ [name] : value });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    const { dispatch } = this.props;
    const { username ,password } = this.state;

    dispatch(loginUser(username, password));
  }

  handleLogout = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    
    dispatch(logoutUser());
  }

  render() {

    const {
      username,
      password,
    } = this.state;

    const {
      isAuthenticated,
      isFetching,
      message,
    } = this.props;
    
    if (isAuthenticated) {
      return (
        <button onClick={this.handleLogout}>Útskrá</button>
      );
    }

    if (isFetching) {
      return (
        <p>Skrái inn <em>{username}</em>...</p>
      );
    }

    return (
      <div>

        <p>Innskráning</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='username'>Username: </label>
            <input id='username' name='username' type='text' value={username} onChange={this.handleInputChange} />
          </div>
          <div>
            <label htmlFor='password' >Password: </label>
            <input id='password' name='password' type='password' value={password}onChange={this.handleInputChange} />
          </div>
          <Button disabled={isFetching}>Innskrá</Button>
        </form>
      </div>
    );
  }
}

/* todo tengja við redux */

const mapStateToProps = (state) => {
  /* todo stilla redux ef það er notað */
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
  }
}

export default connect(mapStateToProps)(Login);