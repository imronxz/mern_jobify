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
  LOGOUT_USER,
  UPDATE_USER, UPDATE_SUCCESS, UPDATE_FAILED,
} from './actions';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

// TODO: global state here
const initialState = {
  // TODO: app additional state
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  // TODO: user state
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',
  showSidebar: false,
  // TODO: job state
  isEditing: false,
  showAlerteditJobId: '',
  position: '',
  company: '',
  // * job location
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
};

//TODO: AppContext -> React.createContext()
const AppContext = React.createContext();

// TODO: context provider here with props children
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ! define axios create with baseURL
  const API = axios.create({
    baseURL: '/api/v1',
  });

  // ! config request axios interceptor
  API.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  // ! confif response axios interceptor
  API.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    },
  );

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
  //* ToggleSidebar
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('location', JSON.stringify(location));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  };

  //* Auth users -> Register and Login user
  const authUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: AUTH_USER });
    try {
      const { data } = await API.post(`/auth/${endPoint}`, currentUser);
      const { user, token, location } = data;

      dispatch({ type: AUTH_SUCCESS, payload: { user, token, location, alertText } });
      //! addUserToLocalStorage
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({ type: AUTH_FAILED, payload: { msg: error.response.data.msg } });
    }
    clearAlert();
  };

  //* update User
  const updateUser = async (currentUser) => {
    dispatch ({ type: UPDATE_USER})
    try {
      const { data } = await API.patch('/auth/updateuser', currentUser);

      const { user, location, token } = data
      
      dispatch({ type: UPDATE_SUCCESS, payload: { user, location, token } })
      addUserToLocalStorage( { user, location, token })
    } catch (error) {
      if (error.response.status !== 401)
        dispatch({
          type: UPDATE_FAILED,
          payload: { msg: error.response.data.msg }
        })
    }
    clearAlert();
  };

  //* Logout User
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        authUser,
        toggleSidebar,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Costum Hook context
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
