const reducer = (state, action) => {
  throw new Error(`Tidak ditemukan action: ${action.type}`);
};

export default reducer;
