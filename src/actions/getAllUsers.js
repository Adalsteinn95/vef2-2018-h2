/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
import api from "../api";

export const GETUSERS_REQUEST = "GETUSERS_REQUEST";
export const GETUSERS_SUCCESS = "GETUSERS_SUCCESS";
export const GETUSERS_ERROR = "GETUSERS_ERROR";

function requestUsers() {
  return {
    type: GETUSERS_REQUEST,
    isFetching: true,
    message: null,
    users: null
  };
}

function getUsersSuccess(users) {
  return {
    type: GETUSERS_SUCCESS,
    isFetching: false,
    users,
    message: null
  };
}

function usersError(message) {
  return {
    type: GETUSERS_ERROR,
    isFetching: false,
    book: null,
    message
  };
}

/* todo fleiri action */

/* todo async "thunk" fyrir tengingu við vefþjónustu */

export const fetchUsers = endpoint => {
  return async dispatch => {
    dispatch(requestUsers());

    try {
      const data = await api.get(endpoint);
      dispatch(getUsersSuccess(data));
    } catch (e) {
      console.error("Error fetching data", e);
      dispatch(usersError(e));
    }
  };
};
