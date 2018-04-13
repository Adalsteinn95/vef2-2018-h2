import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Button from '../button';

import './Header.css';

import { logoutUser } from '../../actions/auth';

class Header extends Component {


  onClick = (e) => {
    console.log('leita');
  }

  handleLogout = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {
    const {
      user,
      isAuthenticated,
    } = this.props;

    return (
      <header className="header">
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>
        {/* ætti samt frekar heima í sér component */}
        <Button onClick={this.onClick}>Leita</Button>


        {isAuthenticated && (
          <div>
            <button onClick={this.handleLogout}>Útskrá</button>
            <h1>{user.username}</h1>
            <h1>{user.name}</h1>
          </div>
        )}

        {!isAuthenticated && (
          <Link to="/login">Innskráning</Link>
        )}
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Header);