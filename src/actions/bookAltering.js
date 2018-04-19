import api from "../api";
export const BOOK_ADD = "BOOK_ADD";
export const BOOK_ALTER = "BOOK_ALTER";
export const BOOK_UPDATED = "BOOK_UPDATED";
export const BOOK_FAILURE = "BOOK_FAILURE";
export const CATEGORIES_GET = "CATEGORIES_GET";
export const CATEGORIES_GOT = "CATEGORIES_GOT";

function newBook() {
  return {
    type: BOOK_ADD,
    isSending: true,
    formInfo: null
  };
}
function updateBook() {
  return {
    type: BOOK_ALTER,
    isSending: true,
    formInfo: null
  };
}
function getCategories() {
  return {
    type: CATEGORIES_GET,
    isFetchingCategories: true
  };
}

function gotCategories(categories) {
  return {
    type: CATEGORIES_GOT,
    isFetchingCategories: false,
    categories
  };
}

function success(formInfo, version) {
  return {
    type: BOOK_UPDATED,
    isSending: false,
    formInfo,
    version
  };
}

function errorAltering(formInfo, version) {
  return {
    type: BOOK_FAILURE,
    isSending: false,
    formInfo,
    version
  };
}

export const getAllCategories = endpoint => {
  return async dispatch => {
    dispatch(getCategories());
    try {
      let categories = await api.get(endpoint);
      dispatch(gotCategories(categories));
    } catch (e) {
      return dispatch(errorAltering(e));
    }
  };
};

export const addBook = (data, endpoint) => {
  return async dispatch => {
    dispatch(newBook());
    try {
      data = await api.post(data, endpoint);
      dispatch(success(data, "add"));
    } catch (e) {
      return dispatch(errorAltering(e, "add"));
    }
  };
};

export const alterBook = (data, endpoint) => {
  return async dispatch => {
    dispatch(updateBook());
    try {
      data = await api.patch(data, endpoint);
      dispatch(success(data, "update"));
    } catch (e) {
      return dispatch(errorAltering(e, "update"));
    }
  };
};
