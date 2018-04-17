import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { fetchBooks, addReadBook, getRead } from "../../actions/books";
import Button from "../../components/button";
import Review from "../review";

import "./Book.css";

class Book extends Component {
  state = { addRead: false, rating: 1, review: "" };
  async componentDidMount() {
    this.props.dispatch(
      fetchBooks(`books/${this.props.match.params.id}`, null, true)
    );
    //þurfum ekki lestrana í þessum component, kannski færa ef þarf
    //this.props.dispatch(getRead("users/me/read"));
  }

  onClick = e => {
    this.setState({ addRead: true });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { review, rating } = this.state;
    const bookId = this.props.book.id;
    this.props.dispatch(
      addReadBook(
        { review, rating: Number(rating), bookId: Number(bookId) },
        "/users/me/read"
      )
    );
    this.setState({ addRead: false });
  };

  render() {
    const { book, isFetching, message = null } = this.props;

    if (isFetching || !book) {
      return <div>Sæki gögn...</div>;
    }

    if (message) {
    }

    if (book.hasOwnProperty("error")) {
      if ((book.error = "Book not found")) {
        return <div>Bók fannst ekki</div>;
      }
    }

    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <div>
          <h1>{book.title}</h1>
          <p>Eftir {book.author}</p>
          <p>ISBN13: {book.isbn13}</p>
          <p>{book.categorytitle}</p>
          <p>{book.description}</p>
          <p>{book.review}</p>
          <p>{book.pagecount} síður</p>
          <p>Gefin út {book.published}</p>
          <p>Tungumál {book.language}</p>
        </div>
        {this.state.addRead && (
          <form onSubmit={this.handleSubmit}>
            <label>
              Um bók:
              <textarea
                rows="8"
                cols="50"
                name="review"
                value={this.state.review}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Einkunn:
              <select
                name="rating"
                value={this.state.rating}
                onChange={this.handleChange}
              >
                <option value="1">1 </option>
                <option value="2">2</option>
                <option value="3">3 </option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <Button children={"Vista"} />
          </form>
        )}
        <Button onClick={this.onClick} children={"Lesin bók"} />
        <Button onClick={this.onClick} children={"Til Baka"} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.books.isFetching,
    message: state.books.message,
    book: state.books.singleBook,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Book);
