import React, { Component } from "react";
import { connect } from "react-redux";

import BookForm from "../bookform";
import { alterBook, getCategories } from "../../actions/bookAltering";
import { fetchBooks } from "../../actions/books";

class UpdateBook extends Component {
  async componentDidMount() {
    await this.props.dispatch(
      fetchBooks(`books/${this.props.match.params.id}`, null, true)
    );

    this.setState({
      ...this.props.book
    });
  }
  state = {
    title: "",
    author: "",
    description: "",
    category: "",
    isbn10: "",
    isbn13: "",
    published: "",
    pagecount: "",
    language: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(
      alterBook({ ...this.state }, `/books/${this.props.match.params.id}`)
    );
  };
  render() {
    const {
      isSending,
      formInfo = {},
      categories,
      isFetchingCategories
    } = this.props;
    if (isSending) {
      return <div>Sendi gögn...</div>;
    }

    return (
      <div>
        <h1>Breyta bók</h1>
        {formInfo.hasOwnProperty("errors") &&
          formInfo.errors.map(error => {
            return (
              <div key={error.field}>
                <p>Field: {error.field}</p>
                <p>Villa: {error.message}</p>
              </div>
            );
          })}
        <BookForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          {...this.state}
        />
        {formInfo.hasOwnProperty("title") && (
          <h2>Bókinni {formInfo.title} hefur breytt</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSending: state.bookAltering.isSending,
    formInfo: state.bookAltering.formInfo,
    isFetching: state.books.isFetching,
    message: state.books.message,
    book: state.books.singleBook
  };
};

export default connect(mapStateToProps)(UpdateBook);
