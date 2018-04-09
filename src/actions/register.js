
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
import api from '../api';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';


function requestRegister() {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    message: null,
  }
}

function userRegister(user){
  return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
    message: null,
  }
}

function errorRegister(message) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  }
}


/* todo async "thunk" fyrir tengingu við vefþjónustu */

export const registerUser = (username, password, name) => {
  return async (dispatch) => {
    dispatch(requestRegister());

    let login;

    try {
      login = await api.register(username, password, name);
      
    } catch (e) {
      return dispatch(errorRegister(e))
    }

    /*
    if (true) {
      console.info(user);
      const { user } = login;
      localStorage.setItem('user', JSON.stringify(user));

      dispatch(userRegister(user));
    }*/
  }
}