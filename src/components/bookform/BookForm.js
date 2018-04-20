import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "../button";
import { getAllCategories } from "../../actions/bookAltering";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "./bookform.css";
class BookForm extends Component {
  static PropTypes = {
    dispatch: PropTypes.func,
    isFetchingCategories: PropTypes.bool.isRequired,
    categories: PropTypes.shape({
      items: PropTypes.array
    }).isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    isbn10: PropTypes.string.isRequired,
    isbn13: PropTypes.string.isRequired,
    published: PropTypes.string.isRequired,
    pagecount: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  };

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
      <ReactCSSTransitionGroup
        transitionName="bookUpdate"
        transitionAppear={true}
        transitionAppearTimeout={1500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <div className="register--container">
          <form onSubmit={this.props.handleSubmit}>
            <div className="register--input">
              <label htmlFor="title">Titill:</label>
              <input
                required
                value={title}
                name="title"
                type="text"
                onChange={this.props.handleChange}
              />
            </div>
            <div className="register--input">
              <label htmlFor="author">Höfundur:</label>
              <input
                required
                value={author}
                name="author"
                type="text"
                onChange={this.props.handleChange}
              />
            </div>
            <div className="description--input">
              <label htmlFor="description">Lýsing:</label>
              <textarea
                value={description}
                name="description"
                rows="8"
                cols="10"
                type="text"
                onChange={this.props.handleChange}
              />
            </div>
            <div className="register--input">
              <label htmlFor="category">Flokkur:</label>
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
            </div>
            <div className="register--input">
              <label htmlFor="isbn10">ISBN10:</label>
              <input
                required
                value={isbn10}
                name="isbn10"
                type="text"
                onChange={this.props.handleChange}
              />
            </div>

            <div className="register--input">
              <label htmlFor="isbn13">ISBN13:</label>
              <input
                required
                value={isbn13}
                name="isbn13"
                type="text"
                onChange={this.props.handleChange}
              />
            </div>
            <div className="register--input">
              <label htmlFor="published">Útgefin:</label>
              <input
                required
                value={published}
                name="published"
                type="text"
                onChange={this.props.handleChange}
              />
            </div>
            <div className="register--input">
              <label htmlFor="pagecount">Fjöldi síða:</label>
              <input
                required
                value={pagecount}
                name="pagecount"
                type="text"
                onChange={this.props.handleChange}
              />
            </div>

            <div className="register--input">
              <label htmlFor="language">Tungumál:</label>
              <input
                required
                value={language}
                name="language"
                type="text"
                onChange={this.props.handleChange}
              />
            </div>
            <Button type="submit" children={"Vista"} />
          </form>
          <Button onClick={this.props.handleClickBack} children={"Til Baka"} />
        </div>
      </ReactCSSTransitionGroup>
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
