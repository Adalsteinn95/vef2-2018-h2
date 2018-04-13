import {
    GETUSERS_REQUEST,
    GETUSERS_SUCCESS,
    GETUSERS_ERROR
    /* todo fleiri actions */
  } from "../actions/getAllUsers";
  
  const initialState = {
    isFetching: true,
    users: []
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case GETUSERS_REQUEST:
        return {
          ...state,
          isFetching: action.isFetching,
          users: action.users,
          message: action.message
        };
      case GETUSERS_SUCCESS:
        return {
          ...state,
          isFetching: action.isFetching,
          users: action.users,
          message: action.message
        };
      case GETUSERS_ERROR:
        return {
          ...state,
          isFetching: action.isFetching,
          users: action.users,
          message: action.message
        };
  
      default:
        return state;
    }
  };
  