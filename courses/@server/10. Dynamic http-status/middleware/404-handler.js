import { StatusCodes } from 'http-status-codes';

const errorhandlerMiddleWare = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: 'Something went wrong, please try again later',
  }

  res.status(defaultError.statusCode).json({ msg: err });
};

export default errorhandlerMiddleWare;
