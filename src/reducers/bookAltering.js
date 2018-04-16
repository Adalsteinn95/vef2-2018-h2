import {
  BOOK_ADD,
  BOOK_ALTER,
  BOOK_UPDATED,
  BOOK_FAILURE,
  CATEGORIES_GET,
  CATEGORIES_GOT
} from "../actions/bookAltering";

const initialState = {
  isSending: false
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
        formInfo: action.formInfo,
        isSending: action.isSending
      };
    case BOOK_FAILURE:
      return {
        ...state,
        isSending: action.isSending,
        formInfo: action.formInfo
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

    default:
      return state;
  }
};
