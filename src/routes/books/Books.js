import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { fetchBooks } from "../../actions/books";
import Button from "../../components/button";

/* todo sækja actions frá ./actions */

import "./Books.css";

class Books extends Component {
  urlpage = Number(queryString.parse(this.props.location.search).page - 1);
  urlsearch = queryString.parse(this.props.location.search).search;
  state = {
    page: this.urlpage > 0 ? this.urlpage : 0,
    search: this.urlsearch || ""
  };

  async componentDidMount() {
    this.fetchBooks();
  }

  componentDidUpdate(prevProps, prevState) {
    const currentSearchValue = this.props.books.searchUrl;
    if (
      this.state.search !== currentSearchValue &&
      currentSearchValue != null
    ) {
      this.setState({ search: currentSearchValue }, this.fetchBooks);
    }
  }

  async fetchBooks(endpoint) {
    this.setState({ searchValue: this.props.location.search });
    const { page, search } = this.state;
    const offset = `offset=${page * 10}`;
    const searchLink = `search=${this.state.search}`;
    this.props.dispatch(fetchBooks(`books?${searchLink}&${offset}`));

    const newSearchUrl = search !== "" ? `search=${search}` : null;
    const newPageUrl = page > 0 ? `page=${page + 1}` : "";
    const newUrl = newSearchUrl
      ? `?${newSearchUrl}${newPageUrl ? `&${newPageUrl}` : ""}`
      : `?${newPageUrl}`;
    this.props.history.push(newUrl);
  }

  handlePageClick = key => {
    this.setState((prevState, props) => {
      return {
        page: Number(prevState.page) + (key === "prev" ? -1 : 1)
      };
    }, this.fetchBooks);
  };
  render() {
    const { books: booksData, isFetching, message } = this.props;
    const { books } = booksData;
    const { page, search } = this.state;
    if (isFetching || !books) {
      return <div>Sæki gögn...</div>;
    }

    if (message) {
      return <div>Villa við að sækja gögn</div>;
    }

    return (
      <div className="books--container">
        {search ? <h1>Bókaleit: {search}</h1> : <h1>Bækur</h1>}
        <div key={page}>
          {books.items.map(book => {
            return (
              <div key={book.id}>
                <Link to={`/books/${book.id}`}>
                  <h3>{book.title}</h3>
                </Link>
                <p>Eftir {book.author}</p>
              </div>
            );
          })}
        </div>
        {page > 0 && (
          <Button
            onClick={() => this.handlePageClick("prev")}
            children={"Fyrri síða"}
          />
        )}
        <span>Síða {page + 1}</span>
        {books.items.length === 10 && (
          <Button
            onClick={() => this.handlePageClick("next")}
            children={"Næsta síða"}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  /* todo stilla redux ef það er notað */
  return {
    isFetching: state.books.isFetching,
    message: state.books.message,
    books: state.books,
    searchUrl: state.books.searchUrl
  };
};

export default connect(mapStateToProps)(Books);
