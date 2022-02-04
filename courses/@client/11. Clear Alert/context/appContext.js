import React, { useReducer, useContext } from 'react';
//! reducer
import reducer from './reducer';
//! actions
import { DISPLAY_ALERT, CLEAR_ALERT } from './actions';

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
  }

  return (
    <AppContext.Provider value={{ ...state, displayAlert }}>
      {children}
    </AppContext.Provider>
  );
};

// Costum Hook context
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
