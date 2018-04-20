import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import queryString from "query-string";
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
/* action */

import { fetchUsers } from "../../actions/getAllUsers";

/* comp */
import Button from "../../components/button";
import "./userpage.css";

class UserPage extends Component {
  urlpage = Number(queryString.parse(this.props.location.search).page - 1);

  state = {
    page: this.urlpage > 0 ? this.urlpage : 0,
    user: null
  };

  async componentDidMount() {
    this.fetchUsers("users");
  }

  async fetchUsers(endpoint) {
    const { page } = this.state;
    const { dispatch, history } = this.props;
    const offset = `offset=${page * 10}`;
    dispatch(fetchUsers(`users?${offset}`));
    const newPageUrl = page > 0 ? `/users/?page=${page + 1}` : "";
    if (newPageUrl) {
      history.push(newPageUrl);
    }
  }

  handlePageClick = key => {
    this.setState((prevState, props) => {
      return {
        page: Number(prevState.page) + (key === "prev" ? -1 : 1)
      };
    }, this.fetchUsers);
  };

  render() {
    const { isFetching, users, message } = this.props;
    const { page } = this.state;
    if (isFetching) {
      return <div>Sæki gögn...</div>;
    }

    if (message) {
      return <div>{message}</div>;
    }

    if (!users) {
      return <div>Sæki gögn...</div>;
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="registerAnimation"
        transitionAppear={true}
        transitionAppearTimeout={1500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Helmet title={`Notendur - síða ${page + 1}`} />

        <div className="users--container">
          <h2>Notendur</h2>
          <div key={this.state.page}>
            {users.items.map((item, index) => {
              const { id, username } = item;

              const url = `/users/${id.toString()}`;
              return (
                <div key={index}>
                  <Link to={url}>{username}</Link>
                </div>
              );
            })}
          </div>
          {this.state.page > 0 && (
            <Button
              onClick={() => this.handlePageClick("prev")}
              children={"Fyrri síða"}
            />
          )}
          <span>Síða {this.state.page + 1}</span>
          {users.items.length === 10 && (
            <Button
              onClick={() => this.handlePageClick("next")}
              children={"Næsta síða"}
            />
          )}
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

const maptstateToProps = state => {
  return {
    isFetching: state.getAllUsers.isFetching,
    users: state.getAllUsers.users,
    message: state.getAllUsers.message
  };
};

export default connect(maptstateToProps)(UserPage);
