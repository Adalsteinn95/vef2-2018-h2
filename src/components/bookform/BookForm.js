import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../button";
import { getAllCategories } from "../../actions/bookAltering";

class BookForm extends Component {
  componentDidMount() {
    this.props.dispatch(getAllCategories("categories?limit=100"));
  }
  render() {
    const { isFetchingCategories, categories } = this.props;
    let categoriesArr;
    if (!isFetchingCategories && categories) {
      categoriesArr = categories.items.map(category => {
        return (
          <option
            key={category.id}
            value={category.title}
            onChange={this.props.handleChange}
          >
            {category.title}
          </option>
        );
      });
    }
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
            {isFetchingCategories ? (
              <p>Sæki flokka</p>
            ) : (
              <select name="category">{categoriesArr}</select>
            )}
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

const mapStateToProps = state => {
  return {
    categories: state.bookAltering.categories,
    isFetchingCategories: state.bookAltering.isFetchingCategories
  };
};

export default connect(mapStateToProps)(BookForm);
