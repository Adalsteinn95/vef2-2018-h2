import {
  BOOK_REQUEST,
  BOOK_SUCCESS,
  BOOK_ERROR,
  BOOK_SEARCH,
  BOOK_ADDREAD,
  BOOK_ADDREAD_ERROR,
  BOOK_ADDREAD_SUCCESS,
  BOOK_GETREAD,
  BOOK_GETREAD_ERROR,
  BOOK_GETREAD_SUCCESS
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
    case BOOK_ADDREAD:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message
      };
    case BOOK_ADDREAD_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message
      };
    case BOOK_ADDREAD_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message
      };
    case BOOK_GETREAD:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message
      };
    case BOOK_GETREAD_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message,
        reviews: action.reviews
      };
    case BOOK_GETREAD_ERROR:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message
      };

    default:
      return state;
  }
};
