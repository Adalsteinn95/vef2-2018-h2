import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../actions/register';

/* upphafstada */

const initialState = {
  isFetching: false,
  user,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        user: action.user,
        message: action.message
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        message: action.message
      };

    default:
      return state;
  }
};
