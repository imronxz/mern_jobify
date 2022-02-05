import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  AUTH_USER, AUTH_SUCCESS, AUTH_FAILED,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,

} from './actions';
import { initialState } from './appContext';

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return { ...state, showAlert: true, alertType: 'danger', alertText: 'Harap isi semua form!', };
    case CLEAR_ALERT:
      return { ...state, showAlert: false, alertText: '', alertType: '' }
    case AUTH_USER:
      return {
        ...state,
        isLoading: true
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user, token: action.payload.token, userLocation: action.payload.location, jobLocation: action.payload.location, isLoading: false, showAlert: true, alertType: 'success', alertText: action.payload.alertText,
      }
    case AUTH_FAILED:
      return {
        ...state,
        isLoading: false, showAlert: true, showAlert: true, alertType: 'danger', alertText: action.payload.msg,
      };
    case TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    case LOGOUT_USER:
      return {
        ...initialState,
        user: null, token: null, userLocation: '', jobLocation: '',
      };
    default:
      return state;
  }
};
export default reducer;
