import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import Button from "../button";
import Search from "../search";

import "./Header.css";

import { logoutUser } from "../../actions/auth";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PropTypes from 'prop-types';

class Header extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    isFetching: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
    })
  }
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
          transitionAppear={true}
          transitionAppearTimeout={1500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <h1 className="header__heading">
            <Link to="/">Bókasafnið</Link>
          </h1>
          <Search />

          {/* Mogulega gera seperated component */}
          {isAuthenticated &&
            user && (
              <React.Fragment>
                <div className="profile--header">
                  <img src={user.image || "/profile.jpg"} alt="profile" />
                  <div className="profile--item">
                    <Link to="/profile/me">{user.name}</Link>
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
