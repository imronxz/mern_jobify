import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  AUTH_USER, AUTH_SUCCESS, AUTH_FAILED,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER, UPDATE_SUCCESS, UPDATE_FAILED,
  HANDLE_CHANGE,
  CLEAR_VALUES
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return { ...state, showAlert: true, alertType: 'danger', alertText: 'Harap isi semua form!', };
    case CLEAR_ALERT:
      return { ...state, showAlert: false, alertText: '', alertType: '' }
    case CLEAR_VALUES:
      const initialState = {
        isEditing: false,
        editJobId: '',
        position: '',
        company: '',
        jobLocation: state.userLocation,
        jobType: 'full-time',
        status: 'pending',
      }
      return {...state, ...initialState}
    case AUTH_USER:
    case UPDATE_USER:
      return {
        ...state,
        isLoading: true
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user, token: action.payload.token, userLocation: action.payload.location, jobLocation: action.payload.location, isLoading: false, showAlert: true, alertType: 'success', alertText: action.payload.alertText,
      }
    case UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload.user, token: action.payload.token, userLocation: action.payload.location, jobLocation: action.payload.location, isLoading: false, showAlert: true, alertType: 'success', alertText: 'User Profile Updated!',
      }
    case AUTH_FAILED:
    case UPDATE_FAILED:
      return {
        ...state,
        isLoading: false, showAlert: true, alertType: 'danger', alertText: action.payload.msg,
      };
    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    case LOGOUT_USER:
      return {
        ...initialState,
        user: null, token: null, userLocation: '', jobLocation: '',
      };
    case HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    default:
      return state;
  }
};
export default reducer;
