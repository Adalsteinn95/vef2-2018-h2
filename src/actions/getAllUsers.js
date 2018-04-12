import api from "../api";

export const GETUSERS_REQUEST = "GETUSERS_REQUEST";
export const GETUSERS_SUCCESS = "GETUSERS_SUCCESS";
export const GETUSERS_ERROR = "GETUSERS_ERROR";
export const GETONEUSER_SUCCESS = "GETONEUSER_SUCCESS";
export const UPDATEUSER_SUCCESS = "UPDATEUSER_SUCCESS";

function requestUsers() {
  return {
    type: GETUSERS_REQUEST,
    isFetching: true,
    message: null,
    users: null,
  };
}

function getUsersSuccess(users) {
  return {
    type: GETUSERS_SUCCESS,
    isFetching: false,
    users,
    message: null,
  };
}

function usersError(message) {
  return {
    type: GETUSERS_ERROR,
    isFetching: false,
    book: null,
    message,
  };
}

function getOneUserSuccess(user) {
  return {
    type: GETONEUSER_SUCCESS,
    isFetching: false,
    user,
    message: null,
  };
}

function updateOneUserSucces(user) {
  return {
    type: GETONEUSER_SUCCESS,
    isFetching: false,
    user,
    message: null,
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


export const fetchOneUser = (id) => {
  return async dispatch => {
    dispatch(requestUsers());

    const endpoint = 'users/' + id;
    let data;
    try {
      data = await api.get(endpoint);
      dispatch(getOneUserSuccess(data));
    } catch (e) {
      console.error("Error fetching data", e);
      dispatch(usersError(e));
    }
  };
};


export const updateOneUser = (username) => {
  return async dispatch => {
    dispatch(requestUsers());

    let data;
    try {
      data = await api.update(username);
      console.info(data);
      const {
        error,
        errors
      } = data;

      if(error || errors) {
        throw error || errors;
      }
      
      dispatch(updateOneUserSucces(data));
    } catch (error) {

      dispatch(usersError(error));
    }
  };
};

