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
        <h1 className="header__heading">
          <Link to="/">Bókasafnið</Link>
        </h1>
        <Search />

        {isAuthenticated && (
          <div>
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={1500}
              transitionEnter={false}
              transitionLeave={false}
            >
              <div>
                <Button onClick={this.handleLogout} children="Útskrá" />
                <img src={user.image || "/profile.jpg"} alt="profile" />
                <h1>{user.username}</h1>
                <h1>{user.name}</h1>
              </div>
            </ReactCSSTransitionGroup>
          </div>
        )}

        {!isAuthenticated && <Link to="/login">Innskráning</Link>}
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
