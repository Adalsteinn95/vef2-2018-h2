import React, { Component } from "react";
import { connect } from "react-redux";

import BookForm from "../bookform";
import { addBook, getCategories } from "../../actions/bookAltering";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

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
              <ReactCSSTransitionGroup
                transitionName="messageAnimation"
                transitionAppear={true}
                transitionAppearTimeout={10000}
                transitionEnter={false}
                transitionLeave={false}
              >
                <div key={error.field}>
                  <p>Villa: {error.message}</p>
                </div>
              </ReactCSSTransitionGroup>
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
