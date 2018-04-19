import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import BookForm from "../bookform";
import { addBook } from "../../actions/bookAltering";

class AddBook extends Component {
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
      addBook(
        {
          ...this.state
        },
        "/books"
      )
    );
  };
  render() {
    const { isSending, formInfo = {}, version } = this.props;
    if (isSending) {
      return <div>Sendi gögn...</div>;
    }

    return (
      <div>
        <Helmet title="Skrá bók" />
        <h1>Skrá bók</h1>
        {formInfo.hasOwnProperty("errors") &&
          version === "add" &&
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
    formInfo: state.bookAltering.formInfo,
    version: state.bookAltering.version
  };
};

export default connect(mapStateToProps)(AddBook);
