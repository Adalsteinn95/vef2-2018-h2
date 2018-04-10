import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { fetchBooks } from "../../actions/books";
import Button from "../../components/button";

/* todo sækja actions frá ./actions */

import "./Books.css";

class Books extends Component {
  urlOffset = queryString.parse(this.props.location.search).offset;
  state = {
    offset: this.urlOffset > 0 ? this.urlOffset : 0
  };

  async componentDidMount() {
    this.fetchBooks();
  }

  async fetchBooks(endpoint) {
    this.props.dispatch(fetchBooks(`books?offset=${this.state.offset}`));
    this.props.history.push(`?offset=${this.state.offset}`);
  }

  handlePageClick = key => {
    this.setState((prevState, props) => {
      console.log(prevState.offset === 0 && key === "prev");
      console.log(prevState.offset + (key === "prev" ? -10 : 10));
      return {
        offset:
          prevState.offset === 0 && key === "prev"
            ? prevState.offset
            : Number(prevState.offset) + (key === "prev" ? -10 : 10)
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
        <div key={this.state.offset}>
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
