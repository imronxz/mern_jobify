import { DISPLAY_ALERT, CLEAR_ALERT } from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return { ...state, showAlert: true, alertType: 'danger', alertText: 'Harap isi semua form!', };
    case CLEAR_ALERT:
      return { ...state, showAlert: false, alertText: '', alertType: '' }
    default:
      return state;
  }
};
export default reducer;
