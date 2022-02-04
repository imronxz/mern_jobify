const notFoundMiddleWare = (req, res) => res.status(404).send('Halaman tidak ditemukan');

export default notFoundMiddleWare;
