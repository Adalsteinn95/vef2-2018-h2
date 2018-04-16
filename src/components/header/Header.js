import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import Button from "../button";
import Search from "../search";

import "./Header.css";

import { logoutUser } from "../../actions/auth";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Header extends Component {
  handleLogout = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  render() {
    const { user, isAuthenticated, isFetching } = this.props;

    if (isFetching) {
      return (
        <header className="header">
          <h1 className="header__heading">
            <Link to="/">Bókasafnið</Link>
          </h1>
          <div>Big Loading...</div>
        </header>
      );
    }

    return (
      <header className="header">
        <ReactCSSTransitionGroup
          transitionName="headerAnimation"
          transitionAppear={true }
          transitionAppearTimeout={1500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <h1 className="header__heading">
            <Link to="/">Bókasafnið</Link>
          </h1>
          <Search />

          {isAuthenticated && (
            <React.Fragment>
              <div className="profile--header">
                <img src={user.image || "/profile.jpg"} alt="profile" />
                <div className='profile--item'>
                  <p>{user.name}</p>
                  <Button onClick={this.handleLogout} children="Útskrá" />
                </div>
              </div>
            </React.Fragment>
          )}

          {!isAuthenticated && <Link to="/login">Innskráning</Link>}
        </ReactCSSTransitionGroup>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    isFetching: state.auth.isFetching
  };
};

export default connect(mapStateToProps)(Header);
