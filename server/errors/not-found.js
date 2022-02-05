import { StatusCodes } from 'http-status-codes';
import { CostumAPIError } from './index.js';

class NotFoundError extends CostumAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export default NotFoundError;