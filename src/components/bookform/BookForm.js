import React, { Component } from "react";
import Button from "../button";

class BookForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <label>
            Titill:
            <input
              name="title"
              type="text"
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            Höfundur:
            <input
              name="author"
              type="text"
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            Lýsing:
            <textarea
              name="desc"
              rows="8"
              cols="10"
              type="text"
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            Flokkur:
            <select name="category" value={this.props.select.value}>
              <option value="Fiction" onChange={this.props.handleChange}>
                Fiction
              </option>
              <option value="Fiction" onChange={this.props.handleChange}>
                Fiction
              </option>
              <option value="Fiction" onChange={this.props.handleChange}>
                Fiction
              </option>
              <option value="Fiction" onChange={this.props.handleChange}>
                Fiction
              </option>
              <option value="Fiction" onChange={this.props.handleChange}>
                Fiction
              </option>
            </select>
          </label>
          <label>
            ISBN10:
            <input
              name="isbn10"
              type="text"
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            ISBN13:
            <input
              name="isbn13"
              type="text"
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            Útgefin:
            <input name="date" type="text" onChange={this.props.handleChange} />
          </label>
          <label>
            Fjöldi síða:
            <input
              name="pagecount"
              type="text"
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            Tungumál:
            <input name="lang" type="text" onChange={this.props.handleChange} />
          </label>
          <Button type="submit" children={"Vista"} />
        </form>
      </div>
    );
  }
}

export default BookForm;
