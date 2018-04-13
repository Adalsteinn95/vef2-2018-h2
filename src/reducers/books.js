import {
  BOOK_REQUEST,
  BOOK_SUCCESS,
  BOOK_ERROR,
  BOOK_SEARCH
  /* todo fleiri actions */
} from "../actions/books";

const initialState = {
  isFetching: true,
  books: [],
  searchUrl: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOK_SEARCH:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books,
        searchUrl: action.searchUrl,
        message: action.message
      };
    case BOOK_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books,
        message: action.message
      };
    case BOOK_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books,
        singleBook: action.singleBook,
        searchUrl: action.searchUrl,
        message: action.message
      };
    case BOOK_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        books: action.books,
        message: action.message
      };

    default:
      return state;
  }
};
