/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
import api from "../api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

function requestRegister() {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    isAuthenticated: false
  };
}

function userRegister(user) {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    message: []
  };
}

function errorRegister(message) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

/* todo async "thunk" fyrir tengingu við vefþjónustu */

export const registerUser = ({ username, password, name }, endpoint) => {
  return async dispatch => {
    dispatch(requestRegister());

    let login;

    try {
      login = await api.post({ username, password, name }, endpoint);
    } catch (e) {
      return dispatch(errorRegister("Náði ekki sambandi við vefþjónustu"));
    }

    if (login.errors) {
      dispatch(errorRegister(login.errors));
    }

    if (!login.errors) {
      dispatch(userRegister(login));
    }
  };
};
