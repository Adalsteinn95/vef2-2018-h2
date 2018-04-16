import React, { Component } from "react";
import { connect } from "react-redux";

import BookForm from "../bookform";
import { alterBook, getCategories } from "../../actions/bookAltering";

class UpdateBook extends Component {
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

    console.log(this.state);
    const data = {
      title: this.state.title,
      author: this.state.author,
      description: this.state.desc,
      category: this.state.category,
      isbn10: this.state.isbn10,
      isbn13: this.state.isbn13,
      published: this.state.date,
      pagecount: Number(this.state.pagecount),
      language: this.state.lang
    };
    // delete falsy values(that havent been changed)
    Object.keys(data).forEach(function(i) {
      if (!data[i]) {
        delete data[i];
      }
    });

    this.props.dispatch(
      alterBook(data, `/books/${this.props.match.params.id}`)
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
    formInfo: state.bookAltering.formInfo
  };
};

export default connect(mapStateToProps)(UpdateBook);
