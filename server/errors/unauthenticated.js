import { StatusCodes } from 'http-status-codes';
import { CostumAPIError } from './index.js';

class UnAuthenticatedError extends CostumAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnAuthenticatedError;
