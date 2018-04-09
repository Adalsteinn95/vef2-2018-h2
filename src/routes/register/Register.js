import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/register';

/* todo sækja actions frá ./actions */

import './Register.css';

class Register extends Component {

  state = {
    username: '',
    password: '',
    name: '',
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
    const { username ,password, name } = this.state;

    dispatch(registerUser(username, password, name));
  }


  render() {

    const {
      username,
      password,
      name,
    } = this.state;

    const {
      isFetching,
      message,
    } = this.props;

    if (isFetching) {
      return (
        <p>Skrái inn <em>{username}</em>...</p>
      );
    }

    return (
      <div>
        {message && (
          <p>{message}</p>
        )}
        <p>Nýskráning</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='username'>Username: </label>
            <input id='username' name='username' type='text' value={username} onChange={this.handleInputChange} />
          </div>
          <div>
            <label htmlFor='password' >Password: </label>
            <input id='password' name='password' type='password' value={password} onChange={this.handleInputChange} />
          </div>
          <div>
            <label htmlFor='name'>Name: </label>
            <input id='name' name='name' type='text' value={name} onChange={this.handleInputChange} />
          </div>
          <button disabled={isFetching}>Nýskrá</button>
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
    message: state.auth.message,
  }
}

export default connect(mapStateToProps)(Register);