import { UnAuthenticatedError } from '../errors/index.js';

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.id === resourceUserId.toString()) return
  throw new UnAuthenticatedError('You do not have permission to do that')
};

export default checkPermissions;