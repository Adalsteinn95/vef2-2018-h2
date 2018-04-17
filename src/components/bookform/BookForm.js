import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../button";
import { getAllCategories } from "../../actions/bookAltering";

class BookForm extends Component {
  componentDidMount() {
    this.props.dispatch(getAllCategories("categories?limit=100"));
  }
  render() {
    const {
      isFetchingCategories,
      categories,
      title,
      author,
      description,
      category,
      isbn10,
      isbn13,
      published,
      pagecount,
      language
    } = this.props;
    let categoriesArr;
    if (!isFetchingCategories && categories) {
      categoriesArr = categories.items.map((category, i) => {
        return (
          <option
            key={category.id}
            value={category.id}
            onChange={this.props.handleChange}
          >
            {category.title}
          </option>
        );
      });
      categoriesArr.unshift(
        <option key="placeholder" value="" disabled defaultValue={true}>
          Veldu flokk...
        </option>
      );
    }
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <label>
            Titill:
            <input
              value={title}
              name="title"
              type="text"
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            Höfundur:
            <input
              value={author}
              name="author"
              type="text"
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            Lýsing:
            <textarea
              value={description}
              name="description"
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
              <select
                value={category}
                onChange={this.props.handleChange}
                name="category"
              >
                {categoriesArr}
              </select>
            )}
          </label>
          <label>
            ISBN10:
            <input
              value={isbn10}
              name="isbn10"
              type="text"
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            ISBN13:
            <input
              value={isbn13}
              name="isbn13"
              type="text"
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            Útgefin:
            <input
              value={published}
              name="published"
              type="text"
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            Fjöldi síða:
            <input
              value={pagecount}
              name="pagecount"
              type="text"
              onChange={this.props.handleChange}
            />
          </label>
          <label>
            Tungumál:
            <input
              value={language}
              name="language"
              type="text"
              onChange={this.props.handleChange}
            />
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
