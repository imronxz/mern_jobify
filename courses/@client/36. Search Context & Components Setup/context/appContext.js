import React, { useReducer, useContext } from 'react';
//! all fn as api from /api
// import * as api from '../api';
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
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB, CREATE_SUCCESS, CREATE_FAILED,
  GET_ALL_JOBS, GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  EDIT_JOB, EDIT_JOB_SUCCESS, EDIT_JOB_FAILED,
  DELETE_JOB,
  SHOW_STATS, SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
} from './actions';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

// TODO: global state here
const initialState = {
  // TODO: app additional state
  isLoading: false, showAlert: false, alertText: '', alertType: '',
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
  // TODO: Get All Jobs Request
  jobs: [],
  totalJobs: 0,
  numOfPages: 0,
  page: 1,
  // TODO: Edit Job
  editJobId: '',
  // TODO: Show Stats
  stats: {},
  monthlyApplication: [],
  // TODO: Filter and Search job
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
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

  //* clear values
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  //* ToggleSidebar
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  };

  //! Auth users -> Register and Login user
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

  //! Logout User
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  //! update User
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER });
    try {
      const { data } = await API.patch('/auth/updateuser', currentUser);

      const { user, location, token } = data;

      dispatch({ type: UPDATE_SUCCESS, payload: { user, location, token } });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401)
        dispatch({
          type: UPDATE_FAILED,
          payload: { msg: error.response.data.msg },
        });
    }
    clearAlert();
  };

  //! Handle Change
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  //! Create Job
  const createJob = async () => {
    dispatch({ type: CREATE_JOB });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await API.post('/jobs', {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });

      dispatch({ type: CREATE_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_FAILED,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //! Get All Jobs
  const getAllJobs = async (req, res) => {
    let url = `/jobs`

    dispatch({ type: GET_ALL_JOBS });
    try {
      const { data } = await API(url);
      const { jobs, totalJobs, numOfPages } = data;

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      // logoutUser();
    }
    clearAlert();
  };

  //! Set Edit Job 
  const setEditJob = (id) => {
    dispatch ({ type: SET_EDIT_JOB, payload: { id }})
  }

  //! Edit Job
  const editJob = async () => {
    dispatch({ type: EDIT_JOB })
    try {
      const { position, company, jobLocation, jobType, status } = state
      
      await API.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      })
      dispatch({ type: EDIT_JOB_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return 
      dispatch({
        type: EDIT_JOB_FAILED,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert()
  }

  //! Delete Job
  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB })
    try {
      await API.delete(`/jobs/${jobId}`)
      getAllJobs();
    } catch (error) {
      console.log(error.response);
      // logoutUser()   
    }
  }

  //! Show Stats
  const showStats = async () => {
    dispatch({ type: SHOW_STATS })
    try {
      const { data } = await API('/jobs/stats')
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplication: data.monthlyApplication
        }
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  //! Clear Filters
  const clearFilters = () => {
    dispatch ({ type: CLEAR_FILTERS })
  }
    

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        authUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getAllJobs,
        setEditJob,
        editJob,
        deleteJob,
        showStats,
        clearFilters,
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
