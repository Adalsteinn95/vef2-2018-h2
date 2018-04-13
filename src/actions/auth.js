
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
import api from '../api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_LOGOUT = 'LOGIN_LOGOUT';
export const UPDATEUSER_SUCCESS = "UPDATEUSER_SUCCESS";
export const UPDATEUSER_FAILURE = "UPDATEUSER_FAILURE";

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

function updateOneUserSucces(user) {
  return {
    type: UPDATEUSER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    message: null,
  };
}

function updateUsererror(message,user) {
  return {
    type: UPDATEUSER_FAILURE,
    isFetching: false,
    isAuthenticated: true,
    user,
    message,
  }
}

/* todo fleiri action */

/* todo async "thunk" fyrir tengingu við vefþjónustu */

export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(requestLogin());

    let login;
    try {
      login = await api.login(username, password);
    } catch (e) {
      return dispatch(errorLogin(e))
    }

    if (login.error) {
      dispatch(errorLogin(login.error))
    }

    if (!login.error) {
      const { user } = login;
      localStorage.setItem('user', JSON.stringify({user}));
      localStorage.setItem('token', JSON.stringify({token: login.token }));
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

export const updateOneUser = ({username, password, image} = {}) => {
  return async dispatch => {


    console.info(image);
    let data;
    try {
      data = await api.update(username, password, image);

      const {
        error,
        errors
      } = data;

      if(error || errors) {
        throw error || errors;
      }


      localStorage.setItem('user', JSON.stringify({user: data}));

      dispatch(updateOneUserSucces(data));
      
    } catch (error) {
      const user = JSON.parse(localStorage.getItem("user" || "null"));

      dispatch(updateUsererror(error,user.user));
    }
  };
};
