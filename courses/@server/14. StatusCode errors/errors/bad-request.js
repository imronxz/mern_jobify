import { StatusCodes } from 'http-status-codes';
import { CostumAPIError } from './index.js';

class BadRequestError extends CostumAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export default BadRequestError;
