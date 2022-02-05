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

// TODO: global state here
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  token: null,
  userLocation: '',
  jobLocation: '',
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
    }, 2000);
  };

  //* register user
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER });
    try {
      const response = await api.register(currentUser);
      const { user, token, location } = response.data;
      console.log(response);
      dispatch({ type: REG_SUCCESS, payload: { user, token, location } });
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
