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
  GET_ALL_JOBS, GET_JOBS_SUCCESS
} from './actions';
import { initialState } from './appContext';

const reducer = (state, action) => {
  //* Clear values
  if (action.type === CLEAR_VALUES) {
    const initialState = { isEditing: false, editJobId: '', position: '', company: '', jobLocation: state.userLocation, jobType: 'full-time', status: 'pending' }
      return { ...state,  ...initialState}
  }
  switch (action.type) {
    //* Display alert
    case DISPLAY_ALERT:
      return { ...state, showAlert: true, alertType: 'danger', alertText: 'Harap isi semua form!', };
    //* Clear alert
    case CLEAR_ALERT:
      return { ...state, showAlert: false, alertText: '', alertType: '' }
    /* TODO: AUTH & UPDATE */
    case AUTH_USER:
    case UPDATE_USER:
      return { ...state, isLoading: true }
    /* TODO: SUCCESS - Auth & Update */
    case AUTH_SUCCESS:
      return { ...state, user: action.payload.user, token: action.payload.token, userLocation: action.payload.location, jobLocation: action.payload.location, isLoading: false, showAlert: true, alertType: 'success', alertText: action.payload.alertText, }
    case UPDATE_SUCCESS:
      return { ...state, user: action.payload.user, token: action.payload.token, userLocation: action.payload.location, jobLocation: action.payload.location, isLoading: false, showAlert: true, alertType: 'success', alertText: 'User Profile Updated!', }
    /* TODO: FAILED - Auth & Update */
    case AUTH_FAILED:
    case UPDATE_FAILED:
      return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg, };
    /* TODO: Toggle Sidebar */
    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    /* TODO: Logout User */
    case LOGOUT_USER:
      return { ...initialState, user: null, token: null, userLocation: '', jobLocation: '', };
    /* TODO: CREATE JOB */
    case HANDLE_CHANGE:
      return { ...state, [action.payload.name]: action.payload.value };
    case CREATE_JOB:
      return { ...state, isLoading: true };
    case CREATE_SUCCESS:
      return { ...state, isLoading: false, showAlert: true, alertType: 'success', alertText: 'Berhasil Tambah Pekerjaan Baru', };
    case CREATE_FAILED:
      return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg}
    /* TODO: GET ALL JOBS */
    case GET_ALL_JOBS:
      return { ...state, isLoading: true, showAlert: false }
    case GET_JOBS_SUCCESS:
      return { ...state, isLoading: false, jobs: action.payload.jobs, totalJobs: action.payload.totalJobs, numOfPages: action.payload.numOfPages}
    default:
      return state;
  }
};
export default reducer;
