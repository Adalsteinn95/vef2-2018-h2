import api from "../api";

export const BOOK_ADD = "BOOK_ADD";
export const BOOK_ALTER = "BOOK_ALTER";
export const BOOK_UPDATED = "BOOK_UPDATED";
export const BOOK_FAILURE = "BOOK_FAILURE";

function newBook() {
  return {
    type: BOOK_ADD,
    isSending: true
  };
}
function alterBook() {
  return {
    type: BOOK_ALTER,
    isSending: true
  };
}

function success() {
  return {
    type: BOOK_UPDATED,
    isSending: false
  };
}

function errorAltering(message) {
  return {
    type: BOOK_FAILURE,
    isSending: false,
    message
  };
}

export const addBook = (data, endpoint) = {
  return async dispatch => {
    dispatch(newBook());
    try {
        data = await api.post(data, endpoint);
        dispatch(success())

    } catch (e) {
      return dispatch(errorAltering(e));
    }
  }
}

export const alterBook = (data, endpoint) = {
  return async dispatch => {
    dispatch(newBook());
    try {
        data = await api.post(data, endpoint);
        dispatch(success())
    } catch (e) {
      return dispatch(errorAltering(e));
    }
  }
}

// export const registerUser = ({ username, password, name }, endpoint) => {
//   return async dispatch => {
//     dispatch(requestRegister());
//
//     let login;
//
//     try {
//       login = await api.post({ username, password, name }, endpoint);
//     } catch (e) {
//       return dispatch(errorRegister(e));
//     }
//
//     if (login.errors) {
//       dispatch(errorRegister(login.errors));
//     }
//
//     if (!login.errors) {
//       dispatch(userRegister(login));
//     }
//   };
// };
