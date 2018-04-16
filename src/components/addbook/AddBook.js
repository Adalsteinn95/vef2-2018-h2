import React, { Component } from "react";
import BookForm from "../bookform";

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
    //  this.dispatch(createBook)
  };
  render() {
    return (
      <div>
        <h1>Skrá bók</h1>
        <BookForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          {...this.state}
        />
      </div>
    );
  }
}

export default AddBook;
