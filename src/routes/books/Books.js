import React, { Component } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import queryString from "query-string";
import { fetchBooks } from "../../actions/books";
import Button from "../../components/button";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PropTypes from "prop-types";

import "./Books.css";

class Books extends Component {
  static propTypes = {
    books: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      message: PropTypes.array,
      searchUrl: PropTypes.string
    }),
    dispatch: PropTypes.func,
    history: PropTypes.shape({
      action: PropTypes.string,
      block: PropTypes.func,
      go: PropTypes.func,
      goBack: PropTypes.func,
      goForward: PropTypes.func,
      length: PropTypes.number,
      listen: PropTypes.func
    }),
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string
    }),
    match: PropTypes.shape({
      path: PropTypes.string,
      url: PropTypes.string,
      isExact: PropTypes.bool,
      params: PropTypes.shape({
        id: PropTypes.number
      })
    }),
    message: PropTypes.array,
    searchUrl: PropTypes.string
  };

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
    if (message && !isFetching) {
      return <div>Villa við að sækja gögn</div>;
    }
    if (isFetching || !books) {
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
        <Helmet title={`Bækur - síða ${page + 1}`} />
        <div className="books--container">
          {search ? <h1>Bókaleit: {search}</h1> : <h1>Bækur</h1>}
          <div key={page}>
            {books &&
              books.items.map(book => {
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
          {books &&
            books.items.length === 10 && (
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

const mapStateToProps = state => {
  return {
    isFetching: state.books.isFetching,
    message: state.books.message,
    books: state.books,
    searchUrl: state.books.searchUrl
  };
};

export default connect(mapStateToProps)(Books);
