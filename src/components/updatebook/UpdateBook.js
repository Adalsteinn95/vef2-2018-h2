import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";

import BookForm from "../bookform";
import { alterBook } from "../../actions/bookAltering";
import { fetchBooks } from "../../actions/books";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./updatebook.css";
import PropTypes from "prop-types";

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

  onClickBack = e => {
    console.log("ping");
    this.props.history.goBack();
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
    const { isSending, formInfo = {}, version } = this.props;
    if (isSending) {
      return <div>Sendi gögn...</div>;
    }

    return (
      <div>
        <Helmet title={`Breyta ${this.state.title}`} />
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
          version === "update" &&
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
                  <p className="alert--text">Villa: {error.message}</p>
                </div>
              </ReactCSSTransitionGroup>
            );
          })}
        <BookForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleClickBack={this.onClickBack}
          {...this.state}
        />
        {formInfo.hasOwnProperty("title") && (
          <h2>Bókinni {formInfo.title} hefur verið breytt</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSending: state.bookAltering.isSending,
    version: state.bookAltering.version,
    formInfo: state.bookAltering.formInfo,
    isFetching: state.books.isFetching,
    message: state.books.message,
    book: state.books.singleBook
  };
};

export default connect(mapStateToProps)(UpdateBook);
