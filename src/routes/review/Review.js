import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { fetchBooks, addReadBook, getRead } from "../../actions/books";
import Button from "../../components/button";

import "./Review.css";

class Review extends Component {
  render() {
    const { reviews = null, bookId } = this.props;

    const relevantReviews = reviews
      ? reviews.items.filter(i => i.book_id === bookId)
      : [];
    return (
      <React.Fragment>
        {relevantReviews.length > 0 && (
          <div>
            <h1>Lesin bók</h1>
            {relevantReviews.map(review => {
              return (
                <div key={review.id}>
                  <p>Einkunn: {review.rating}</p>
                  <p>{review.review}</p>
                </div>
              );
            })}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.books.isFetching,
    message: state.books.message,
    book: state.books.singleBook,
    user: state.auth.user,
    reviews: state.books.reviews
  };
};

export default connect(mapStateToProps)(Review);
