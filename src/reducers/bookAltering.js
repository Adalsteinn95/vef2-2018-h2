import {
  BOOK_ADD,
  BOOK_ALTER,
  BOOK_UPDATED,
  BOOK_FAILURE,
  CATEGORIES_GET,
  CATEGORIES_GOT
} from "../actions/bookAltering";

const initialState = {
  isSending: false,
  message: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOK_ADD:
      return {
        ...state,
        isSending: action.isSending
      };
    case BOOK_ALTER:
      return {
        ...state,
        isSending: action.isSending
      };
    case BOOK_UPDATED:
      return {
        ...state,
        message: action.message,
        isSending: action.isSending
      };
    case CATEGORIES_GET:
      return {
        ...state,
        message: action.message,
        isFetchingCategories: action.isFetchingCategories
      };
    case CATEGORIES_GOT:
      return {
        ...state,
        message: action.message,
        isFetchingCategories: action.isFetchingCategories,
        categories: action.categories
      };
    case BOOK_FAILURE:
      return {
        ...state,
        isSending: action.isSending,
        message: action.message
      };

    default:
      return state;
  }
};
