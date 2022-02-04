import React, {  useEffect, useContext } from 'react';
//! reducer
import reducer from './reducer'

// TODO: global state here
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};

//TODO: AppContext -> React.createContext()
const AppContext = React.createContext();

// TODO: context provider here with props children
const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>;
};

// Costum Hook context
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
