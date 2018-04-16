import {
  BOOK_ADD,
  BOOK_ALTER,
  BOOK_UPDATED,
  BOOK_FAILURE
} from "../actions/bookAltering";

const initialState = {
  isSending: false,
  message: []
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
        isSending: action.isSending
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
