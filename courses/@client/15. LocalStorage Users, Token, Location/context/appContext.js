import React, { useReducer, useContext } from 'react';
//! all fn as api from /api
import * as api from '../api';

//! reducer
import reducer from './reducer';
//! actions
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER,
  REG_SUCCESS,
  REG_FAIL,
} from './actions';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

// TODO: global state here
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',
};

//TODO: AppContext -> React.createContext()
const AppContext = React.createContext();

// TODO: context provider here with props children
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //* display Alert on Form fields
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  //* clear Alert
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('location', JSON.stringify(location));
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
  }

  //* register user
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER });
    try {
      const response = await api.register(currentUser);
      const { user, token, location } = response.data;

      dispatch({ type: REG_SUCCESS, payload: { user, token, location } });
      //! addUserToLocalStorage
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({ type: REG_FAIL, payload: { msg: error.response.data.msg } });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
      {children}
    </AppContext.Provider>
  );
};

// Costum Hook context
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
