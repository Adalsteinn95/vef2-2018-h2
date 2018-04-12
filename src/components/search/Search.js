import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { fetchBooks } from "../../actions/books";
import Button from "../button";

import "./Search.css";
const history = createHistory();

class Search extends Component {
  state = { searchvalue: "" };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ searchvalue: value }, this.updateBooks);
  };

  updateBooks = () => {
    this.props.dispatch(fetchBooks("books", this.state.searchvalue));
  };

  handleSubmit = e => {
    history.push(`books?search=${this.state.searchvalue}`);
  };

  render() {
    const { searchvalue } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Bókaleit"
            value={searchvalue}
            type="text"
            name="search"
            onChange={this.handleChange}
          />
          <Button children={"Leita"} />
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchUrl: state.books.search,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Search);
