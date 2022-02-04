const errorhandlerMiddleWare = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'Masalah sambungan pada server' });
};

export default errorhandlerMiddleWare