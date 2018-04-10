import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {

  render() {
    const {
      user, 
    } = this.props;

    return (
      <div>
        <p>Notendasíða</p>
        <p>{user.username}</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  /* todo stilla redux ef það er notað */
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Profile);
