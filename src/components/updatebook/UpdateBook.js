import React, { Component } from "react";
import { connect } from "react-redux";

import BookForm from "../bookform";
import { alterBook } from "../../actions/bookAltering";
import { fetchBooks } from "../../actions/books";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./updatebook.css";

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
    const bookData = Object.assign({}, this.state);
    bookData.pageCount = bookData.pagecount;
    delete bookData.pagecount;

    this.props.dispatch(
      alterBook({ ...bookData }, `/books/${this.props.match.params.id}`)
    );
  };
  render() {
    const { isSending, formInfo = {} } = this.props;
    if (isSending) {
      return <div>Sendi gögn...</div>;
    }

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="bookHeader"
          transitionAppear={true}
          transitionAppearTimeout={1500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <h1>Breyta bók</h1>
        </ReactCSSTransitionGroup>
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
