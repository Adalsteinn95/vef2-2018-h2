import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { fetchBooks } from "../../actions/books";
import Button from "../../components/button";

/* todo sækja actions frá ./actions */

import "./Books.css";

class Books extends Component {
  urlpage = queryString.parse(this.props.location.search).page;
  state = {
    page: this.urlpage > 0 ? this.urlpage : 0
  };

  async componentDidMount() {
    this.fetchBooks();
  }

  async fetchBooks(endpoint) {
    this.props.dispatch(fetchBooks(`/books?offset=${this.state.page * 10}`));
    this.props.history.push(`?page=${this.state.page}`);
  }

  handlePageClick = key => {
    console.log(this.state.page);
    this.setState((prevState, props) => {
      return {
        page:
          prevState.page === 0 && key === "prev"
            ? prevState.page
            : Number(prevState.page) + (key === "prev" ? -1 : 1)
      };
    }, this.fetchBooks);
  };
  render() {
    console.log(this.props);
    const { books: booksData, isFetching, message } = this.props;
    const { books } = booksData;
    if (isFetching) {
      return <div>Sæki gögn...</div>;
    }

    if (message) {
      return <div>Villa við að sækja gögn</div>;
    }

    return (
      <div>
        <h2>Bækur</h2>
        <div key={this.state.page}>
          {books.items.map(book => {
            return (
              <div key={book.id}>
                <h3>{book.title}</h3>
                <p>Eftir {book.author}</p>
              </div>
            );
          })}
        </div>
        <Button
          onClick={() => this.handlePageClick("prev")}
          children={"Fyrri síða"}
        />
        <Button
          onClick={() => this.handlePageClick("next")}
          children={"Næsta síða"}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  /* todo stilla redux ef það er notað */
  return {
    isFetching: state.books.isFetching,
    message: state.books.message,
    books: state.books
  };
};

export default connect(mapStateToProps)(Books);
