/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
import api from "../api";

export const BOOK_REQUEST = "BOOK_REQUEST";
export const BOOK_SUCCESS = "BOOK_SUCCESS";
export const BOOK_ERROR = "BOOK_ERROR";

function requestBooks() {
  return {
    type: BOOK_REQUEST,
    isFetching: true,
    message: null,
    books: null
  };
}

function bookSuccess(books) {
  return {
    type: BOOK_SUCCESS,
    isFetching: false,
    books,
    message: null
  };
}

function bookError(message) {
  return {
    type: BOOK_SUCCESS,
    isFetching: false,
    book: null,
    message
  };
}

/* todo fleiri action */

/* todo async "thunk" fyrir tengingu við vefþjónustu */

export const fetchBooks = endpoint => {
  return async dispatch => {
    dispatch(requestBooks());

    try {
      const data = await api.get(endpoint);
      dispatch(bookSuccess(data));
      // this.setState({ data, loading: false });
    } catch (e) {
      console.error("Error fetching data", e);
      dispatch(bookError(e));
    }
  };
};
