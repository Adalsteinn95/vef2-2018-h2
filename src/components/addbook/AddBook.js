import React, { Component } from "react";
import Button from "../button";

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
    console.log(this.state);
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log("boom");
    //  this.dispatch(createBook)
  };
  render() {
    return (
      <div>
        <h1>Skrá bók</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Titill:
            <input name="title" type="text" onChange={this.handleChange} />
          </label>
          <label>
            Höfundur:
            <input name="author" type="text" onChange={this.handleChange} />
          </label>
          <label>
            Lýsing:
            <textarea
              name="desc"
              rows="8"
              cols="10"
              type="text"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Flokkur:
            <select name="category" value={this.state.select.value}>
              <option value="Fiction" onChange={this.handleChange}>
                Fiction
              </option>
              <option value="Fiction" onChange={this.handleChange}>
                Fiction
              </option>
              <option value="Fiction" onChange={this.handleChange}>
                Fiction
              </option>
              <option value="Fiction" onChange={this.handleChange}>
                Fiction
              </option>
              <option value="Fiction" onChange={this.handleChange}>
                Fiction
              </option>
            </select>
          </label>
          <label>
            ISBN10:
            <input name="isbn10" type="text" onChange={this.handleChange} />
          </label>
          <label>
            ISBN13:
            <input name="isbn13" type="text" onChange={this.handleChange} />
          </label>
          <label>
            Útgefin:
            <input name="date" type="text" onChange={this.handleChange} />
          </label>
          <label>
            Fjöldi síða:
            <input name="pagecount" type="text" onChange={this.handleChange} />
          </label>
          <label>
            Tungumál:
            <input name="lang" type="text" onChange={this.handleChange} />
          </label>
          <Button type="submit" children={"Vista"} />
        </form>
      </div>
    );
  }
}

export default AddBook;
