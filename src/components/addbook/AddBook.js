import React, { Component } from "react";
import { connect } from "react-redux";

import BookForm from "../bookform";
import { addBook, getCategories } from "../../actions/bookAltering";

class AddBook extends Component {
  state = {
    select: {},
    title: "",
    author: "",
    desc: "",
    category: "",
    isbn10: "",
    isbn13: "",
    date: "",
    pagecount: "",
    lang: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(
      addBook(
        {
          title: this.state.title,
          author: this.state.author,
          desc: this.state.desc,
          category: this.state.category,
          isbn10: this.state.isbn10,
          isbn13: this.state.isbn13,
          date: this.state.date,
          pagecount: this.state.pagecount,
          lang: this.state.lang,
          genre: this.state.select.value
        },
        "/books"
      )
    );
  };
  render() {
    const {
      isSending,
      formErrors,
      categories,
      isFetchingCategories
    } = this.props;
    if (isSending) {
      return <div>Sendi gögn...</div>;
    }

    return (
      <div>
        <h1>Skrá bók</h1>
        {formErrors &&
          formErrors.errors.map(error => {
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSending: state.bookAltering.isSending,
    formErrors: state.bookAltering.formErrors
  };
};

export default connect(mapStateToProps)(AddBook);
