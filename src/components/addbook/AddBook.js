import React, { Component } from "react";
import { connect } from "react-redux";

import BookForm from "../bookform";
import { addBook, getCategories } from "../../actions/bookAltering";

class AddBook extends Component {
  state = {
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
          description: this.state.desc,
          category: this.state.category,
          isbn10: this.state.isbn10,
          isbn13: this.state.isbn13,
          published: this.state.date,
          pagecount: Number(this.state.pagecount),
          language: this.state.lang
        },
        `/books/${this.props.match.params.id}`
      )
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
        <h1>Skrá bók</h1>
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
          <h2>Bókin {formInfo.title} hefur verið skráð</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSending: state.bookAltering.isSending,
    formInfo: state.bookAltering.formInfo
  };
};

export default connect(mapStateToProps)(AddBook);
