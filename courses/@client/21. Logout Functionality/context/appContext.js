import React, { useReducer, useContext } from 'react';
//! all fn as api from /api
import * as api from '../api';
import axios from 'axios';

//! reducer
import reducer from './reducer';
//! actions
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  AUTH_USER, AUTH_SUCCESS, AUTH_FAILED,
  TOGGLE_SIDEBAR,
  LOGOUT_USER
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
  showSidebar: false,
};

//TODO: AppContext -> React.createContext()
const AppContext = React.createContext();

// TODO: context provider here with props children
const AppProvider = ({ children }) => {
  const API = axios.create({ baseURL: 'http://localhost:5000' });

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

  //* Auth users -> Register and Login user
  const authUser = async ({currentUser,endPoint, alertText}) => {
    dispatch({ type: AUTH_USER });
    try {
      const { data } = await API.post(`/api/v1/auth/${endPoint}`, currentUser);
      const { user, token, location } = data;

      dispatch({ type: AUTH_SUCCESS, payload: { user, token, location, alertText } });
      //! addUserToLocalStorage
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({ type: AUTH_FAILED, payload: { msg: error.response.data.msg } });
    }
    clearAlert();
  };

  //* Logout User
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  }

  //* ToggleSidebar
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  
  return (
    <AppContext.Provider value={{ ...state, displayAlert, authUser, toggleSidebar, logoutUser }}>
      {children}
    </AppContext.Provider>
  );
};

// Costum Hook context
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
