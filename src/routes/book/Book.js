import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { fetchBooks } from "../../actions/books";
import Button from "../../components/button";

import "./Book.css";

class Book extends Component {
  async componentDidMount() {
    console.log("should");
    this.props.dispatch(
      fetchBooks(`books/${this.props.match.params.id}`, null, true)
    );
  }

  render() {
    const { book, isFetching, message } = this.props;

    if (isFetching || !book) {
      return <div>Sæki gögn...</div>;
    }

    if (message) {
      return <div>Villa við að sækja gögn</div>;
    }
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <h1>{book.title}</h1>
        <p>Eftir {book.author}</p>
        <p>ISBN13: {book.isbn13}</p>
        <p>{book.categorytitle}</p>
        <p>{book.description}</p>
        <p>{book.pagecount} síður</p>
        <p>Gefin út {book.published}</p>
        <p>Tungumál {book.language}</p>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log("BOOK STATE", state);
  return {
    isFetching: state.books.isFetching,
    message: state.books.message,
    book: state.books.singleBook
  };
};

export default connect(mapStateToProps)(Book);
