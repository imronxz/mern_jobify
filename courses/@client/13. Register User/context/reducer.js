import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER, REG_SUCCESS, REG_FAIL } from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return { ...state, showAlert: true, alertType: 'danger', alertText: 'Harap isi semua form!', };
    case CLEAR_ALERT:
      return { ...state, showAlert: false, alertText: '', alertType: '' }
    case REGISTER_USER:
      return { ...state, isLoading: true }
    case REG_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        isLoading: false, 
        showAlert: true,
        alertType: 'success',
        alertText: 'Berhasil daftar akun! Sedang dialihkan ke halaman utama...',
      }
    case REG_FAIL:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    default:
      return state;
  }
};
export default reducer;
