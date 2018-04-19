import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../components/button";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { getRead, deleteRead } from "../../actions/books";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import './ReadbooksList.css'

class readBooksList extends Component {
  urlpage = Number(queryString.parse(this.props.location).page - 1);

  state = {
    page: this.urlpage > 0 ? this.urlpage : 0
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { page } = this.state;
    const offset = `offset=${page * 10}`;
    dispatch(getRead(`users/me/read?${offset}`));
  }

  handlePageClick = key => {
    this.setState((prevState, props) => {
      return {
        page: Number(prevState.page) + (key === "prev" ? -1 : 1)
      };
    }, this.componentDidMount);
  };

  if(isFetching) {
    return <div>Loading...</div>;
  }

  render() {
    const { isFetching, message = null, reviews, deleteOption } = this.props;

    const { page } = this.state;

    if (isFetching) {
      return <div>Loading...</div>;
    }

    return (
      <ReactCSSTransitionGroup
          transitionName="bookUpdate"
          transitionAppear={true}
          transitionAppearTimeout={1500}
          transitionEnter={false}
          transitionLeave={false}
        >
      <div className="readbooks--container" key={1}>
        <h1>Lesnar Bækur</h1>
        {reviews.items.map(book => {
          return (
            <form key={book.id} id={book.id} onSubmit={this.handleDelete}>
              <Link to={`/books/${book.book_id}`}>
                <h3>{book.title}</h3>
              </Link>
              <p>Einkunn: {book.rating}</p>
              {book.review && (
                <p>Um bókina: {book.review}</p>
              )}
              {deleteOption && (
                <Button className="danger" onClick={this.handleDelete}>
                  Eyda
                </Button>
              )}
            </form>
          );
        })}
        {page > 0 && (
          <Button
            onClick={() => this.handlePageClick("prev")}
            children={"Fyrri síða"}
          />
        )}
        <span>Síða {page + 1}</span>
        {reviews.items.length === 10 && (
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
    reviews: state.books.reviews,
    isFetching: state.books.isFetching
  };
};
export default connect(mapStateToProps)(readBooksList);
