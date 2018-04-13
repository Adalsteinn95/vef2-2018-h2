/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
import api from "../api";

export const BOOK_REQUEST = "BOOK_REQUEST";
export const BOOK_SUCCESS = "BOOK_SUCCESS";
export const BOOK_ERROR = "BOOK_ERROR";
export const BOOK_SEARCH = "BOOK_SEARCH";

function searchBooks(search) {
  return {
    type: BOOK_SEARCH,
    isFetching: true,
    message: null,
    searchUrl: search,
    books: null
  };
}

function requestBooks() {
  return {
    type: BOOK_REQUEST,
    isFetching: true,
    message: null,
    books: null
  };
}

function bookSuccess(books, search, singleBook) {
  console.log("SINGLE", singleBook);
  return {
    type: BOOK_SUCCESS,
    isFetching: false,
    books,
    singleBook,
    searchUrl: search,
    message: null
  };
}

function bookError(message) {
  return {
    type: BOOK_ERROR,
    isFetching: false,
    book: null,
    message
  };
}

/* todo fleiri action */

/* todo async "thunk" fyrir tengingu við vefþjónustu */

export const fetchBooks = (endpoint, search, shouldGetOneBook) => {
  return async dispatch => {
    dispatch(requestBooks());
    dispatch(searchBooks(search));

    try {
      const data = await api.get(endpoint, `?${search}`);
      console.log("LEIT", shouldGetOneBook);
      shouldGetOneBook
        ? dispatch(bookSuccess(null, search, data))
        : dispatch(bookSuccess(data, search));
    } catch (e) {
      console.error("Error fetching data", e);
      dispatch(bookError(e));
    }
  };
};
