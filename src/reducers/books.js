import {
  BOOK_REQUEST,
  BOOK_SUCCESS,
  BOOK_ERROR
  /* todo fleiri actions */
} from "../actions/books";

const initialState = {
  isFetching: true,
  books: []
};

export default (state = initialState, action) => {
  switch (action.type) {
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
