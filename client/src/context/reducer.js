import { DISPLAY_ALERT } from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Harap isi semua form!',
      };
    default:
      return state;
  }
};
export default reducer;
