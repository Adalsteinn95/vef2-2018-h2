
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
import api from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOING_SUCCESS';
export const LOGIN_FAILURE = 'LOING_FAILURE';
export const LOGIN_LOGOUT = 'LOING_LOGOUT';

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    message: null,
  }
}

function userLogin(user){
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    message: null,
  }
}

function errorLogin(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  }
}

function logout() {
  return {
    type: LOGIN_LOGOUT,
    isFetching: false,
    isAuthenticated: false,
    user: null,
  }
}

/* todo fleiri action */

/* todo async "thunk" fyrir tengingu við vefþjónustu */

export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(requestLogin());

    console.info(username)

    let login;
    try {
      login = await api.login(username, password);
    } catch (e) {
      return dispatch(errorLogin(e))
    }

    
    if (!login.loggedIn) {
      console.info(login.loggedIn);
      dispatch(errorLogin(login.error))
    }

    if (login.loggedIn) {
      const { user } = login;
      localStorage.setItem('user', JSON.stringify({token: login.user.token }));
      dispatch(userLogin(user));
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem('user');
    dispatch(logout());
  }
}