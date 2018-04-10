import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../../actions/books";
import Button from "../../components/button";

/* todo sækja actions frá ./actions */

import "./Books.css";

class Books extends Component {
  state = { offset: 0 };

  async componentDidMount() {
    this.fetchBooks();
  }

  async fetchBooks() {
    this.props.dispatch(fetchBooks(`books?offset=${this.state.offset}`));
  }

  handleNextPageClick = e => {
    this.setState((prevState, props) => {
      return { offset: prevState.offset + 10 };
    }, this.fetchBooks);
  };
  handlePrevPageClick = e => {
    this.setState((prevState, props) => {
      return {
        offset:
          prevState.offset === 0 ? prevState.offset : prevState.offset - 10
      };
    }, this.fetchBooks);
  };
  render() {
    const { books, isFetching, message } = this.props;

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
          {books.books.items.map(book => {
            return (
              <div key={book.id}>
                <h3>{book.title}</h3>
                <p>Eftir {book.author}</p>
              </div>
            );
          })}
        </div>
        <Button onClick={this.handlePrevPageClick} children="Fyrri síða" />
        <Button onClick={this.handleNextPageClick} children="Næsta síða" />
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
